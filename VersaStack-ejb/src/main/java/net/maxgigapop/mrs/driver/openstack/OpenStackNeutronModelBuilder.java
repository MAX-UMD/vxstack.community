/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.maxgigapop.mrs.driver.openstack;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.model.Instance;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJBException;
import net.maxgigapop.mrs.common.Mrs;
import static net.maxgigapop.mrs.common.Mrs.hasNetworkAddress;
import net.maxgigapop.mrs.common.Nml;
import net.maxgigapop.mrs.common.RdfOwl;
import net.maxgigapop.mrs.common.ResourceTool;
import org.apache.commons.net.util.SubnetUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openstack4j.api.OSClient;
import org.openstack4j.api.networking.RouterService;
import org.openstack4j.model.compute.Server;
import org.openstack4j.model.network.AllowedAddressPair;
import org.openstack4j.model.network.HostRoute;
import org.openstack4j.model.network.IP;
import org.openstack4j.model.network.NetFloatingIP;
import org.openstack4j.model.network.Network;
import org.openstack4j.model.network.Pool;
import org.openstack4j.model.network.Port;
import org.openstack4j.model.network.Router;
import org.openstack4j.model.network.RouterInterface;
import org.openstack4j.model.network.Subnet;
import org.openstack4j.model.storage.block.Volume;
import org.openstack4j.openstack.compute.domain.NovaFloatingIP;
import org.openstack4j.openstack.networking.domain.AddRouterInterfaceAction;
import org.openstack4j.openstack.networking.domain.NeutronRouterInterface;

/**
 *
 * @author max
 */
public class OpenStackNeutronModelBuilder {

    private static final String uri = "urn:ogf:network:";

    public static OntModel createOntology(String url, String NATServer, String topologyURI, String user_name, String password, String tenantName,
            String adminUsername, String adminPassword, String adminTenant, OntModel modelExt) throws IOException, Exception {
        ArrayList fip = new ArrayList();
        String POOL = null;
        Logger logger = Logger.getLogger(OpenStackNeutronModelBuilder.class.getName());

        //create model object
        OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM_MICRO_RULE_INF);

        //set all the model prefixes
        model.setNsPrefix("rdfs", RdfOwl.getRdfsURI());
        model.setNsPrefix("rdf", RdfOwl.getRdfURI());
        model.setNsPrefix("xsd", RdfOwl.getXsdURI());
        model.setNsPrefix("owl", RdfOwl.getOwlURI());
        model.setNsPrefix("nml", Nml.getURI());
        model.setNsPrefix("mrs", Mrs.getURI());
        OpenstackPrefix.uri = topologyURI.replace("urn:ogf:network:", "");

        //set the global properties
        Property hasNode = Nml.hasNode;
        Property hasBidirectionalPort = Nml.hasBidirectionalPort;
        Property hasService = Nml.hasService;
        Property providesVPC = Mrs.providesVPC;
        Property providesVM = Mrs.providesVM;
        Property type = Mrs.type;
        Property providedByService = Mrs.providedByService;
        Property providesBucket = Mrs.providesBucket;
        Property providesRoute = Mrs.providesRoute;
        Property hasRoute = Mrs.hasRoute;

        Property providesSubnet = Mrs.providesSubnet;

        Property providesVolume = Mrs.providesVolume;
        Property routeFrom = Mrs.routeFrom;
        Property routeTo = Mrs.routeTo;
        Property nextHop = Mrs.nextHop;
        Property value = Mrs.value;
        Property hasBucket = Mrs.hasBucket;
        Property hasVolume = Mrs.hasVolume;
        Property hasTopology = Nml.hasTopology;
        Property targetDevice = model.createProperty(model.getNsPrefixURI("mrs") + "target_device");

        Property hasTag = Mrs.hasTag;
        Property hasNetworkAddress = Mrs.hasNetworkAddress;
        Property providesRoutingTable = model.createProperty(model.getNsPrefixURI("mrs") + "providesRoutingTable");
        Property isAlias = Nml.isAlias;
        //set the global resources
        Resource route = Mrs.Route;
        Resource hypervisorService = Mrs.HypervisorService;

        Resource blockStorageService = Mrs.BlockStorageService;
        Resource bucket = Mrs.Bucket;
        Resource volume = Mrs.Volume;
        Resource topology = Nml.Topology;

        Resource networkAddress = Mrs.NetworkAddress;
        Resource switchingSubnet = Mrs.SwitchingSubnet;
        Resource switchingService = Mrs.SwitchingService;
        Resource node = Nml.Node;
        Resource biPort = Nml.BidirectionalPort;
        Resource RoutingService = Mrs.RoutingService;
        Resource namedIndividual = model.createResource(model.getNsPrefixURI("mrs") + "NamedIndividual");
        Resource objectStorageService = Mrs.ObjectStorageService;
        //Resource OpenstackTopology = model.createResource("urn:ogf:network:dragon.maxgigapop.net:topology");
        Resource OpenstackTopology = RdfOwl.createResource(model, topologyURI, topology);
        //Resource Neutron = model.createResource("urn:ogf:network:dragon.maxgigapop.net:openstack-neutron");
        Resource networkService = RdfOwl.createResource(model, ResourceTool.getResourceUri(topologyURI + ":network-service", OpenstackPrefix.networkService, ""), Mrs.VirtualCloudService);

        Resource routingService = RdfOwl.createResource(model, topologyURI + ":routing-service", RoutingService);
        Resource cinderService = RdfOwl.createResource(model, topologyURI + ":cinder-service", blockStorageService);

        //port tag
        OpenStackGet openstackget = new OpenStackGet(url, NATServer, user_name, password, tenantName);

        if (adminUsername != null && adminPassword != null && adminTenant != null) {
            Authenticate authenticate = new Authenticate();
            OSClient adminClient = authenticate.openStackAuthenticate(url, NATServer, adminUsername, adminPassword, adminTenant);
            openstackget.fetchAddResources(adminClient);
        }

        model.add(model.createStatement(OpenstackTopology, hasService, routingService));
        model.add(model.createStatement(OpenstackTopology, hasService, cinderService));
        model.add(model.createStatement(OpenstackTopology, hasService, networkService));
        model.add(model.createStatement(OpenstackTopology, hasService, cinderService));

        //Left part
        for (Port p : openstackget.getPorts()) {
            String PortID = openstackget.getResourceName(p);
            Resource PORT = RdfOwl.createResource(model, ResourceTool.getResourceUri(PortID, OpenstackPrefix.PORT, OpenstackPrefix.uri, PortID), biPort);
            for (IP q : p.getFixedIps()) {
                if (q.getIpAddress() != null || !q.getIpAddress().isEmpty()) {
                    String s = q.getSubnetId();
                    Subnet sub = openstackget.getSubnet(s);
                    Resource FIXEDIP = RdfOwl.createResource(model, topologyURI + ":subnet+" + openstackget.getResourceName(sub) + ":fixedip+" + q.getIpAddress(), networkAddress);
                    model.add(model.createStatement(PORT, hasNetworkAddress, FIXEDIP));
                    model.add(model.createStatement(FIXEDIP, value, q.getIpAddress()));
                    if (openstackget.getNetwork(p.getNetworkId()).isRouterExternal()) {
                        model.add(model.createStatement(FIXEDIP, type, "ipv4:public"));
                    } else {
                        model.add(model.createStatement(FIXEDIP, type, "ipv4:private"));
                    }
                }
            }
        }
        
        for (Server server : openstackget.getServers()) {

            String hostID = server.getHost();
            if (hostID == null || hostID.isEmpty()) {
                hostID = server.getHostId();
            }

            String hypervisorname = server.getHypervisorHostname();
            String imageid = server.getImageId();
            String flavorid = server.getFlavorId();
            String server_name = openstackget.getServereName(server);

            Resource HOST = RdfOwl.createResource(model, topologyURI + ":" + "host+" + hostID, node);

            Resource HYPERVISOR = RdfOwl.createResource(model, topologyURI + ":" + "hypervisor+" + hypervisorname, hypervisorService);//need to update here
            Resource VM = RdfOwl.createResource(model, ResourceTool.getResourceUri(server_name, OpenstackPrefix.vm, OpenstackPrefix.uri, server_name), node);

            model.add(model.createStatement(OpenstackTopology, hasNode, HOST));

            model.add(model.createStatement(HOST, hasService, HYPERVISOR));
            model.add(model.createStatement(HYPERVISOR, providesVM, VM));
            model.add(model.createStatement(HOST, hasNode, VM));
            model.add(model.createStatement(VM, type, "imageID+" + imageid));
            model.add(model.createStatement(VM, type, "flavorID+" + flavorid));

            for (Port port : openstackget.getServerPorts(server)) {
                String PortName = openstackget.getResourceName(port);
                Resource Port = RdfOwl.createResource(model, ResourceTool.getResourceUri(PortName, OpenstackPrefix.PORT, OpenstackPrefix.uri, PortName), biPort);

                model.add(model.createStatement(VM, hasBidirectionalPort, Port));
                //model.add(model.createStatement(Port, hasTag, PORT_TAG));
            }
            // UCS STIOV sp;ecial handling
            Map<String, String> metadata = openstackget.getMetadata(server);
            if (metadata == null || !metadata.containsKey("sriov_vnic:status") || metadata.get("sriov_vnic:status").equals("detached")) {
                continue;
            }
            Resource vmfexSvc = RdfOwl.createResource(model, ResourceTool.getResourceUri(server_name, OpenstackPrefix.hypervisorBypassSvc, OpenstackPrefix.uri, server_name, "vmfex"), Mrs.HypervisorBypassInterfaceService);
            model.add(model.createStatement(VM, Nml.hasService, vmfexSvc));
            Resource vmRoutingSvc = RdfOwl.createResource(model, ResourceTool.getResourceUri(server_name, OpenstackPrefix.routingService, OpenstackPrefix.uri, server_name + ":linuxrouting"), Mrs.RoutingService);
            model.add(model.createStatement(VM, Nml.hasService, vmRoutingSvc));
            int sriovVnicNum = 1;
            while (true) {
                String sriovVnicKey = String.format("sriov_vnic:%d", sriovVnicNum);
                if (!metadata.containsKey(sriovVnicKey)) {
                    break;
                }
                String sriovVnicJson = metadata.get(sriovVnicKey);
                JSONParser parser = new JSONParser();
                try {
                    sriovVnicJson = sriovVnicJson.replaceAll("'", "\""); // tolerate single quotes
                    JSONObject jsonObj = (JSONObject) parser.parse(sriovVnicJson);
                    // interface
                    if (!jsonObj.containsKey("interface") || !jsonObj.containsKey("profile")) {
                        Logger.getLogger(OpenStackNeutronModelBuilder.class.getName()).log(Level.WARNING,
                                String.format("OpenStack driver model server '%s' SRIOV interface without both 'interface' and 'profile' parameters in metadata ''%s'", server_name, sriovVnicKey));
                        sriovVnicNum++;
                        continue;
                    }
                    String vnicName = (String) jsonObj.get("interface");
                    Resource sriovPort = RdfOwl.createResource(model, (VM.getURI() + ":port+" + vnicName), Nml.BidirectionalPort);
                    model.add(model.createStatement(VM, Nml.hasBidirectionalPort, sriovPort));
                    model.add(model.createStatement(vmfexSvc, Mrs.providesVNic, sriovPort));
                    // profile
                    String portProfile = (String) jsonObj.get("profile");
                    Resource profileSwSubnet = RdfOwl.createResource(model, ResourceTool.getResourceUri(portProfile, OpenstackPrefix.ucs_port_profile, OpenstackPrefix.uri, portProfile), Mrs.SwitchingSubnet);
                    if (modelExt.getBaseModel() == null || !modelExt.contains(profileSwSubnet, Mrs.type, "Cisco_UCS_Port_Profile")) {
                        Logger.getLogger(OpenStackNeutronModelBuilder.class.getName()).log(Level.WARNING,
                                String.format("OpenStack driver model server '%s' SRIOV interface without 'profile'='%s' already being defined in modelExtention", server_name, portProfile));
                        sriovVnicNum++;
                        continue;
                    }
                    model.add(model.createStatement(profileSwSubnet, Nml.hasBidirectionalPort, sriovPort));
                    // ipaddr
                    if (jsonObj.containsKey("ipaddr") && !((String) jsonObj.get("ipaddr")).isEmpty()) {
                        Resource vnicIP = RdfOwl.createResource(model, ResourceTool.getResourceUri((String) jsonObj.get("ipaddr"), OpenstackPrefix.public_address, OpenstackPrefix.uri, server_name + ":" + vnicName, (String) jsonObj.get("ipaddr")), Mrs.NetworkAddress);
                        model.add(model.createStatement(vnicIP, Mrs.type, "ipv4-network-address"));
                        model.add(model.createStatement(sriovPort, Mrs.hasNetworkAddress, vnicIP));
                    }
                    // macaddr
                    if (jsonObj.containsKey("macaddr") && !((String) jsonObj.get("macaddr")).isEmpty()) {
                        Resource vnicMAC = RdfOwl.createResource(model, ResourceTool.getResourceUri((String) jsonObj.get("macaddr"), OpenstackPrefix.mac_address, OpenstackPrefix.uri, server_name + ":" + vnicName, (String) jsonObj.get("macaddr")), Mrs.NetworkAddress);
                        model.add(model.createStatement(vnicMAC, Mrs.type, "mac-address"));
                        model.add(model.createStatement(sriovPort, Mrs.hasNetworkAddress, vnicMAC));
                    }

                    // routes from RoutingService for VM
                    if (jsonObj.containsKey("routes")) {
                        JSONArray jsonRoutes = (JSONArray) jsonObj.get("routes");
                        for (Object obj : jsonRoutes) {
                            JSONObject jsonRoute = (JSONObject) obj;
                            if (!jsonRoute.containsKey("to") || !jsonRoute.containsKey("via")) {
                                continue;
                            }
                            String strRouteTo = ((String) jsonRoute.get("to")).replaceAll("/", "");
                            String strRouteVia = ((String) jsonRoute.get("via")).replaceAll("/", "");
                            Resource vnicRoute = RdfOwl.createResource(model, sriovPort.getURI() + ":route+to-" + strRouteTo + "-via-" + strRouteVia, Mrs.Route);
                            model.add(model.createStatement(vmRoutingSvc, Mrs.providesRoute, vnicRoute));
                            Resource vnicRouteTo = RdfOwl.createResource(model, sriovPort.getURI() + ":routeto+" + strRouteTo, Mrs.NetworkAddress);
                            model.add(model.createStatement(vnicRouteTo, Mrs.type, "ipv4-prefix"));
                            model.add(model.createStatement(vnicRouteTo, Mrs.value, strRouteTo));
                            model.add(model.createStatement(vnicRoute, Mrs.routeTo, vnicRouteTo));
                            Resource vnicRouteVia = RdfOwl.createResource(model, sriovPort.getURI() + ":next+" + strRouteVia, Mrs.NetworkAddress);
                            model.add(model.createStatement(vnicRouteVia, Mrs.type, "ipv4-netwrk-address"));
                            model.add(model.createStatement(vnicRouteVia, Mrs.value, strRouteVia));
                            model.add(model.createStatement(vnicRoute, Mrs.nextHop, vnicRouteVia));
                        }
                    }
                } catch (ParseException e) {
                    Logger.getLogger(OpenStackNeutronModelBuilder.class.getName()).log(Level.WARNING,
                            String.format("OpenStack driver cannot parse server '%s' metadata '%s' for '%s' ", server.getName(), sriovVnicJson, sriovVnicKey));
                }
                sriovVnicNum++;
            }
        }

        for (NetFloatingIP f : openstackget.getFloatingIp()) {
            fip.add(f.getFloatingIpAddress());
        }
        String FLOATING_IP_INUSE = fip.toString();

        //Right subnet part
        for (Network n : openstackget.getNetworks()) {
            String networkID = openstackget.getResourceName(n);
            Resource NETWORK = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID, OpenstackPrefix.NETWORK, OpenstackPrefix.uri, networkID), topology);
            model.add(model.createStatement(OpenstackTopology, hasTopology, NETWORK));
            model.add(model.createStatement(networkService, providesVPC, NETWORK));
            Resource SWITCHINGSERVICE = null;
            SWITCHINGSERVICE = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID + ":switchingservice", OpenstackPrefix.switching_service, OpenstackPrefix.uri, networkID), switchingService);

            model.add(model.createStatement(NETWORK, hasService, SWITCHINGSERVICE));

            //TO FIND THE EXTERNAL OR INTERNAL NETWORK
            if (n.isRouterExternal()) {
                // Resource EXTERNALNETWORK_TAG = RdfOwl.createResource(model, topologyURI + "network_tag_external", Mrs.Tag);

                model.add(model.createStatement(NETWORK, type, "external"));
                /*ne
                 model.add(model.createStatement(EXTERNALNETWORK_TAG, type, "network-type"));
                 model.add(model.createStatement(EXTERNALNETWORK_TAG, value, "external"));
                 */
                for (Subnet s : n.getNeutronSubnets()) {
                    //@xyang hack to work around a openstack4j flaw
                    if (s == null) {
                        continue;
                    }

                    for (Pool ap : s.getAllocationPools()) {
                        String START = ap.getStart();

                        String END = ap.getEnd();
                        String subnetId = openstackget.getResourceName(s);

                        //Resource SUBNET = RdfOwl.createResource(model, topologyURI + ":" + "network+" + networkID + ":subnet+" + subnetId, switchingSubnet);
                        Resource SUBNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.subnet, OpenstackPrefix.uri, networkID, subnetId), switchingSubnet);
                        //Resource EXTERNALSUBNET_TAG = RdfOwl.createResource(model, topologyURI + ":subnet_tag_public", Mrs.Tag);

                        model.add(model.createStatement(SWITCHINGSERVICE, providesSubnet, SUBNET));
                        //Resource SUBNET_NETWORK_ADDRESS
                        //= RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":subnet+" + subnetId + ":subnetnetworkaddress", networkAddress);
                        Resource SUBNET_NETWORK_ADDRESS = null;
                        SUBNET_NETWORK_ADDRESS = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId + ":subnetnetworkaddress", OpenstackPrefix.subnet_network_address, OpenstackPrefix.uri, networkID, subnetId), networkAddress);

                        Resource FLOATING_IP_INUSING
                                //= RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":subnet+" + subnetId + ":floatingip-inuse", networkAddress);
                                = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.floating_ip_in_using, OpenstackPrefix.uri, networkID, subnetId), networkAddress);
                        Resource FLOATING_IP_POOL = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.floating_ip_pool, OpenstackPrefix.uri, networkID, subnetId), networkAddress);
                        if(s.getGateway() != null){
                            String gateway = s.getGateway();
                            Resource GATEWAY = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId + "gateway", OpenstackPrefix.gateway, OpenstackPrefix.uri, networkID, subnetId, gateway), networkAddress);
                            model.add(model.createStatement(SUBNET, hasNetworkAddress, GATEWAY));
                            model.add(model.createStatement(GATEWAY, type, "gateway"));
                            model.add(model.createStatement(GATEWAY, value, gateway));
                        }
                        model.add(model.createStatement(OpenstackTopology, hasNetworkAddress, FLOATING_IP_INUSING));
                        model.add(model.createStatement(FLOATING_IP_INUSING, type, "ipv4-floatingip"));
                        model.add(model.createStatement(FLOATING_IP_INUSING, value, FLOATING_IP_INUSE));//need to modify here
                        model.add(model.createStatement(OpenstackTopology, hasNetworkAddress, FLOATING_IP_POOL));
                        model.add(model.createStatement(FLOATING_IP_POOL, type, "ipv4-floatingip-pool"));
                        model.add(model.createStatement(FLOATING_IP_POOL, value, START + "-" + END));
                        model.add(model.createStatement(SUBNET, hasNetworkAddress, SUBNET_NETWORK_ADDRESS));
                        model.add(model.createStatement(SUBNET_NETWORK_ADDRESS, type, "ipv4-prefix"));
                        model.add(model.createStatement(SUBNET_NETWORK_ADDRESS, value, s.getCidr()));
                        
                        for (Port port : openstackget.getPorts()) {
                            for (String subID : openstackget.getPortSubnetID(port)) {
                                String subName = openstackget.getResourceName(openstackget.getSubnet(subID));
                                if (subnetId.equals(subName)) {
                                    String PortName = openstackget.getResourceName(port);
                                    Resource Port = RdfOwl.createResource(model, ResourceTool.getResourceUri(PortName, OpenstackPrefix.PORT, OpenstackPrefix.uri, PortName), biPort);
                                    model.add(model.createStatement(SUBNET, hasBidirectionalPort, Port));
                                    //model.add(model.createStatement(Port, hasTag, PORT_TAG));

                                }

                            }
                        }

                        //external routing table
                        String dest = "0.0.0.0/24";
                        //String destIP = destIp.replace("/", "");
                        String nextHOP = s.getGateway();
                        Resource ROUTINGSERVICE = null;
                        ROUTINGSERVICE = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID + ":network-routingservice", OpenstackPrefix.network_routing_service, OpenstackPrefix.uri, networkID), RoutingService);

                        // Resource ROUTINGSERVICE = RdfOwl.createResource(model, ResourceTool.getResourceUri(topologyURI+":network+"+networkID+":network-routingservice", OpenstackPrefix.network_routing_service , OpenstackPrefix.uri, networkID), RoutingService);
                        Resource EXROUTINGTABLE = null;
                        EXROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID + ":route-routingtable", OpenstackPrefix.network_routing_table, OpenstackPrefix.uri, networkID), Mrs.RoutingTable);
                        // Resource EXROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(topologyURI+":network+"+networkID+":network-routingservice", OpenstackPrefix.network_routing_table , OpenstackPrefix.uri, networkID), Mrs.RoutingTable);
                        Resource EXROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(dest, OpenstackPrefix.network_route, OpenstackPrefix.uri, networkID, dest, subnetId), route);
                        Resource EXNEXTHOP = RdfOwl.createResource(model, ResourceTool.getResourceUri(nextHOP, OpenstackPrefix.network_route_next_hop, OpenstackPrefix.uri, networkID, nextHOP), networkAddress);
                        Resource DEST_EXTERNAL = RdfOwl.createResource(model, ResourceTool.getResourceUri(dest, OpenstackPrefix.network_route_dest, OpenstackPrefix.uri, OpenstackPrefix.uri, networkID, dest), networkAddress);
                        Resource LOCAL_ROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.local_route, OpenstackPrefix.uri, networkID, subnetId), Mrs.Route);
                        model.add(model.createStatement(NETWORK, hasService, ROUTINGSERVICE));
                        model.add(model.createStatement(ROUTINGSERVICE, providesRoutingTable, EXROUTINGTABLE));
                        model.add(model.createStatement(ROUTINGSERVICE, providesRoute, EXROUTE));
                        model.add(model.createStatement(ROUTINGSERVICE, providesRoute, LOCAL_ROUTE));
                        model.add(model.createStatement(EXROUTINGTABLE, hasRoute, EXROUTE));
                        model.add(model.createStatement(EXROUTINGTABLE, hasRoute, LOCAL_ROUTE));
                        model.add(model.createStatement(EXROUTE, routeFrom, SUBNET));

                        model.add(model.createStatement(EXROUTE, routeTo, DEST_EXTERNAL));
                        model.add(model.createStatement(DEST_EXTERNAL, type, "ipv4-prefix"));
                        model.add(model.createStatement(DEST_EXTERNAL, value, dest));

                        model.add(model.createStatement(EXROUTE, nextHop, EXNEXTHOP));
                        model.add(model.createStatement(EXNEXTHOP, type, "ipv4-network-address"));
                        model.add(model.createStatement(EXNEXTHOP, value, nextHOP));

                        model.add(model.createStatement(LOCAL_ROUTE, routeFrom, SUBNET));
                        model.add(model.createStatement(LOCAL_ROUTE, routeTo, SUBNET_NETWORK_ADDRESS));
                        model.add(model.createStatement(LOCAL_ROUTE, nextHop, "local"));

                        for (HostRoute hr : s.getHostRoutes()) {
                            String destIp = hr.getDestination();
                            // String destIP = destIp.replace("/", "");
                            String destIP = destIp;
                            String nextHOPEXT = hr.getNexthop();
                            //System.out.println("aaaa" + destIP);
                            
                            //TODO naming convention not good
                            Resource EXHOSTROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.host_route, OpenstackPrefix.uri, networkID, destIP, subnetId), route);

                            Resource EXHOSTROUTETO = RdfOwl.createResource(model, ResourceTool.getResourceUri(destIP, OpenstackPrefix.host_route_to, OpenstackPrefix.uri, networkID, subnetId, destIP), networkAddress);
                            Resource EXHOSTNEXTHOP = RdfOwl.createResource(model, ResourceTool.getResourceUri(nextHOPEXT, OpenstackPrefix.host_route_next_hop, OpenstackPrefix.uri, networkID, destIP, subnetId, nextHOPEXT), networkAddress);
                            Resource EXHOSTROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.host_route_routing_table, OpenstackPrefix.uri, networkID, destIP, subnetId), Mrs.RoutingTable);

                            model.add(model.createStatement(NETWORK, hasService, ROUTINGSERVICE));
                            model.add(model.createStatement(ROUTINGSERVICE, providesRoutingTable, EXHOSTROUTINGTABLE));
                            model.add(model.createStatement(ROUTINGSERVICE, providesRoute, EXHOSTROUTE));
                            model.add(model.createStatement(EXHOSTROUTINGTABLE, hasRoute, EXHOSTROUTE));

                            model.add(model.createStatement(EXHOSTROUTE, routeFrom, SUBNET));
                            model.add(model.createStatement(EXHOSTROUTE, routeTo, EXHOSTROUTETO));
                            model.add(model.createStatement(EXHOSTROUTE, nextHop, EXHOSTNEXTHOP));

                            model.add(model.createStatement(EXHOSTROUTETO, type, "ipv4-prefix"));
                            model.add(model.createStatement(EXHOSTROUTETO, value, destIp));

                            model.add(model.createStatement(EXHOSTNEXTHOP, type, "ipv4-netwrok-address"));
                            model.add(model.createStatement(EXHOSTNEXTHOP, value, nextHOPEXT));

                        }
                    }
                }
            } else {
                //Resource TENANTNETWORK_TAG = RdfOwl.createResource(model, topologyURI + ":network_tag_tenant", Mrs.Tag);

                if (n.getSubnets().size() != 0) {

                    for (Subnet s : n.getNeutronSubnets()) {
                        //@xyang hack to work around a openstack4j flaw
                        if (s == null) {
                            continue;
                        }

                        String subnetId = openstackget.getResourceName(s);
                        Resource SUBNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.subnet, OpenstackPrefix.uri, networkID, subnetId), switchingSubnet);
                        //Resource ROUTE = RdfOwl.createResource(model, topologyURI + ":" + s.get, switchingSubnet);
                        model.add(model.createStatement(SWITCHINGSERVICE, providesSubnet, SUBNET));
                        Resource SUBNET_NETWORK_ADDRESS = null;
                        SUBNET_NETWORK_ADDRESS = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId + ":cidr", OpenstackPrefix.subnet_network_address, OpenstackPrefix.uri, networkID, subnetId), networkAddress);
                        
                        Resource ROUTINGSERVICE = null;
                        ROUTINGSERVICE = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID + ":network-routingservice", OpenstackPrefix.network_routing_service, OpenstackPrefix.uri, networkID), RoutingService);
                        Resource ROUTINGTABLEPERNET = null;
                        ROUTINGTABLEPERNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID + ":route-routingtable", OpenstackPrefix.network_routing_table, OpenstackPrefix.uri, networkID), Mrs.RoutingTable);
                        if(s.getGateway() != null){
                            String gateway = s.getGateway();
                            Resource GATEWAY = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId + ":gateway", OpenstackPrefix.gateway, OpenstackPrefix.uri, networkID, subnetId, gateway), networkAddress);
                            model.add(model.createStatement(SUBNET, hasNetworkAddress, GATEWAY));
                            model.add(model.createStatement(GATEWAY, type, "gateway"));
                            model.add(model.createStatement(GATEWAY, value, gateway));
                        }
                        //Resource ROUTINGTABLEPERNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(networkID, OpenstackPrefix.network_routing_table , OpenstackPrefix.uri, networkID), Mrs.RoutingTable);
                        Resource LOCAL_ROUTE = null;
                        LOCAL_ROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId + ":local-route", OpenstackPrefix.local_route, OpenstackPrefix.uri, networkID, subnetId), Mrs.Route);

                        //Resource TENANT_SUBNET_TAG = RdfOwl.createResource(model, topologyURI + ":subnet_tag_private", Mrs.Tag);
                        model.add(model.createStatement(SUBNET, hasNetworkAddress, SUBNET_NETWORK_ADDRESS));
                        model.add(model.createStatement(SUBNET_NETWORK_ADDRESS, type, "ipv4-prefix"));
                        model.add(model.createStatement(SUBNET_NETWORK_ADDRESS, value, s.getCidr()));

                        //subnet route modeling 
                        model.add(model.createStatement(NETWORK, hasService, ROUTINGSERVICE));
                        model.add(model.createStatement(ROUTINGSERVICE, providesRoutingTable, ROUTINGTABLEPERNET));
                        model.add(model.createStatement(ROUTINGSERVICE, providesRoute, LOCAL_ROUTE));
                        model.add(model.createStatement(ROUTINGTABLEPERNET, hasRoute, LOCAL_ROUTE));

                        model.add(model.createStatement(LOCAL_ROUTE, routeFrom, SUBNET));
                        model.add(model.createStatement(LOCAL_ROUTE, routeTo, SUBNET_NETWORK_ADDRESS));
                        model.add(model.createStatement(LOCAL_ROUTE, nextHop, "local"));

                        //host route modeling
                        for (HostRoute hr : s.getHostRoutes()) {
                            String destIp = hr.getDestination();
                            //String destIP = destIp.replace("/", "");
                            String destIP = destIp;
                            String nextHOP = hr.getNexthop();
                            //System.out.println("aaaa" + destIP);
                            Resource INROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.host_route, OpenstackPrefix.uri, networkID, destIP, subnetId), route);
                            Resource INROUTEFROM = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.host_route_route_from, OpenstackPrefix.uri, networkID, subnetId), switchingSubnet);
                            Resource INROUTETO = RdfOwl.createResource(model, ResourceTool.getResourceUri(destIP, OpenstackPrefix.host_route_to, OpenstackPrefix.uri, networkID, subnetId, destIP), networkAddress);
                            Resource INNEXTHOP = RdfOwl.createResource(model, ResourceTool.getResourceUri(nextHOP, OpenstackPrefix.host_route_next_hop, OpenstackPrefix.uri, networkID, destIP, subnetId, nextHOP), networkAddress);
                            Resource HOSTROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.host_route_routing_table, OpenstackPrefix.uri, networkID, destIP, subnetId), Mrs.RoutingTable);
                            /*
                             Resource INROUTE = RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":dest_ip+" + destIP + ":route_from+" + subnetId + ":hostroute-tenant", route);
                             Resource INROUTEFROM = RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":subnet+" + subnetId + ":route_from", switchingSubnet);
                             Resource INROUTETO = RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":dest_ip+" + destIP, networkAddress);
                             Resource INNEXTHOP = RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":subnet+" + subnetId + ":next-hop+" + nextHOP + ":route-tenant", networkAddress);
                             Resource HOSTROUTINGTABLE = RdfOwl.createResource(model, topologyURI + ":network+" + networkID + ":subnet+" + subnetId + ":hostroutingtable", Mrs.RoutingTable);
                             */
                            model.add(model.createStatement(NETWORK, hasService, ROUTINGSERVICE));
                            model.add(model.createStatement(ROUTINGSERVICE, providesRoutingTable, HOSTROUTINGTABLE));
                            model.add(model.createStatement(ROUTINGSERVICE, providesRoute, INROUTE));
                            model.add(model.createStatement(HOSTROUTINGTABLE, hasRoute, INROUTE));
                            model.add(model.createStatement(INROUTE, routeFrom, INROUTEFROM));
                            model.add(model.createStatement(INROUTE, routeTo, INROUTETO));
                            model.add(model.createStatement(INROUTE, nextHop, INNEXTHOP));

                            model.add(model.createStatement(INROUTEFROM, type, "subnet"));
                            model.add(model.createStatement(INROUTEFROM, value, subnetId));

                            model.add(model.createStatement(INNEXTHOP, type, "ipv4-network-address"));
                            model.add(model.createStatement(INNEXTHOP, value, nextHOP));

                            model.add(model.createStatement(INROUTETO, type, "ipv4-prefix"));
                            model.add(model.createStatement(INROUTETO, value, destIp));

                        }

                        for (Port port : openstackget.getPorts()) {
                            for (String subID : openstackget.getPortSubnetID(port)) {
                                String subName = openstackget.getResourceName(openstackget.getSubnet(subID));
                                if (subnetId.equals(subName) || subID.equals(s.getId())) { //not enter the if  
                                    String PortName = openstackget.getResourceName(port);
                                    Resource Port = RdfOwl.createResource(model, ResourceTool.getResourceUri(PortName, OpenstackPrefix.PORT, OpenstackPrefix.uri, PortName), biPort);
                                    model.add(model.createStatement(SUBNET, hasBidirectionalPort, Port));

                                }

                            }
                        }

                    }
                }
            }
        }

        //BUILDING THE ROUTING TABLE
        for (Router r : openstackget.getRouters()) {
            String routername = openstackget.getResourceName(r);
            // routername = routername.replaceAll("[^A-Za-z0-9()_-]", "");
            for (Port port : openstackget.getPorts()) {

                if (port.getDeviceId().equals(r.getId())) {

                    for (String DES_SUB : openstackget.getPortSubnetID(port)) {
                        String DES_SUB_NAME = openstackget.getResourceName(openstackget.getSubnet(DES_SUB));
                        Subnet s = openstackget.getSubnet(DES_SUB);
                        DES_SUB = openstackget.getResourceName(s);
                        String net_ID = s.getNetworkId();
                        String NET_ID = openstackget.getResourceName(openstackget.getNetwork(net_ID));
                        Resource SUBNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(DES_SUB, OpenstackPrefix.subnet, OpenstackPrefix.uri, NET_ID, DES_SUB), switchingSubnet);
                        for (IP ip2 : port.getFixedIps()) {
                            String INTERFACE_IP = ip2.getIpAddress();
                            Resource ROUTER_INTERFACE_ROUTE_NEXTHOP = RdfOwl.createResource(model, ResourceTool.getResourceUri(INTERFACE_IP, OpenstackPrefix.router_interface_next_hop, OpenstackPrefix.uri, routername, INTERFACE_IP), networkAddress);
                            Resource ROUTER_INTERFACE_ROUTINGTABLE = null;
                            ROUTER_INTERFACE_ROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(routername, OpenstackPrefix.router_interface_routingtable, OpenstackPrefix.uri, routername), Mrs.RoutingTable);
                            //Resource ROUTER_INTERFACE_ROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(routername, OpenstackPrefix.router_interface_routingtable, OpenstackPrefix.uri, routername), Mrs.RoutingTable);
                            Resource ROUTER_INTERFACE_ROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(INTERFACE_IP, OpenstackPrefix.router_interface_route, OpenstackPrefix.uri, routername, INTERFACE_IP), route);
                            //Resource ROUTER_INTERFACE_ROUTE_TO = RdfOwl.createResource(model, topologyURI + ":-router-interface-route-to "+":" + SUBNET, switchingSubnet);
                            model.add(model.createStatement(routingService, providesRoutingTable, ROUTER_INTERFACE_ROUTINGTABLE));
                            model.add(model.createStatement(routingService, providesRoute, ROUTER_INTERFACE_ROUTE));
                            model.add(model.createStatement(ROUTER_INTERFACE_ROUTINGTABLE, hasRoute, ROUTER_INTERFACE_ROUTE));
                            model.add(model.createStatement(ROUTER_INTERFACE_ROUTE, routeTo, SUBNET));
                            model.add(model.createStatement(ROUTER_INTERFACE_ROUTE, nextHop, ROUTER_INTERFACE_ROUTE_NEXTHOP));

                            model.add(model.createStatement(ROUTER_INTERFACE_ROUTE_NEXTHOP, type, "ipv4-network-address"));
                            model.add(model.createStatement(ROUTER_INTERFACE_ROUTE_NEXTHOP, value, INTERFACE_IP));
                        }
                        /*
                         //external gateway route part
                         if (openstackget.getNetwork(openstackget.getSubnet(DES_SUB).getNetworkId()).isRouterExternal()) {
                         Resource EXTERNAL_GATEWAY_ROUTINTABLE = RdfOwl.createResource(model, topologyURI + ":-external-gateway-routingtable" + openstackget.getResourceName(r), Mrs.RoutingTable);
                         Resource EXTERNAL_GATEWAY_ROUTE = RdfOwl.createResource(model, topologyURI + ":-external-gateway-route" + openstackget.getResourceName(r), route);
                         String EXTERNAL_GATEWAY_ROUTE_TO = "0.0.0.0/0";
                         Resource EXTERNAL_GATEWAY_ROUTE_NEXTHOP = RdfOwl.createResource(model, topologyURI + ": -external-gateway-route-nexthop" + DES_SUB_NAME, nextHop);
                         //need to modify here
                         model.add(model.createStatement(routingService, providesRoutingTable, EXTERNAL_GATEWAY_ROUTINTABLE));
                         model.add(model.createStatement(EXTERNAL_GATEWAY_ROUTINTABLE, providesRoute, EXTERNAL_GATEWAY_ROUTE));
                         model.add(model.createStatement(EXTERNAL_GATEWAY_ROUTE, routeTo, EXTERNAL_GATEWAY_ROUTE_TO));
                         model.add(model.createStatement(EXTERNAL_GATEWAY_ROUTE, nextHop, EXTERNAL_GATEWAY_ROUTE_NEXTHOP));
                         }
                         */
                    }

                }
            }
            //router host route
            for (HostRoute hr : r.getRoutes()) {
                String RHOSTTO = hr.getDestination();
                String RHOSTNEXTHOP = hr.getNexthop();
                String host_dest = hr.getDestination();

                Resource RHOSTROUTINGTABLE = RdfOwl.createResource(model, ResourceTool.getResourceUri(routername, OpenstackPrefix.router_host_route, OpenstackPrefix.uri, routername), Mrs.RoutingTable);
                Resource RHOSTROUTE = RdfOwl.createResource(model, ResourceTool.getResourceUri(RHOSTNEXTHOP, OpenstackPrefix.router_host_route, OpenstackPrefix.uri, routername, host_dest, RHOSTNEXTHOP), route);//maybe need to modify
                Resource RHOSTROUTETO = RdfOwl.createResource(model, ResourceTool.getResourceUri(host_dest, OpenstackPrefix.router_host_routeto, OpenstackPrefix.uri, routername, host_dest), networkAddress);
                Resource RHOSTROUTENEXTHOP = RdfOwl.createResource(model, ResourceTool.getResourceUri(RHOSTNEXTHOP, OpenstackPrefix.router_host_route_nexthop, OpenstackPrefix.uri, routername, RHOSTNEXTHOP), networkAddress);

                model.add(model.createStatement(routingService, providesRoutingTable, RHOSTROUTINGTABLE));
                model.add(model.createStatement(routingService, providesRoute, RHOSTROUTE));
                model.add(model.createStatement(RHOSTROUTINGTABLE, hasRoute, RHOSTROUTE));
                model.add(model.createStatement(RHOSTROUTE, routeTo, RHOSTROUTETO));
                model.add(model.createStatement(RHOSTROUTE, nextHop, RHOSTROUTENEXTHOP));

                model.add(model.createStatement(RHOSTROUTETO, type, "subnet"));
                model.add(model.createStatement(RHOSTROUTETO, value, RHOSTTO));

                model.add(model.createStatement(RHOSTROUTENEXTHOP, type, "ipv4-network-address"));
                model.add(model.createStatement(RHOSTROUTENEXTHOP, value, RHOSTNEXTHOP));
            }

        }

        for (Volume v : openstackget.getVolumes()) {
            String volumeName = openstackget.getVolumeName(v);
            Resource VOLUME = RdfOwl.createResource(model, ResourceTool.getResourceUri(volumeName, OpenstackPrefix.volume, OpenstackPrefix.uri, volumeName), volume);
            model.add(model.createStatement(cinderService, providesVolume, VOLUME));
            model.add(model.createStatement(VOLUME, value, v.getVolumeType()));
            model.add(model.createStatement(VOLUME, Mrs.disk_gb, Integer.toString(v.getSize())));
        }

        for (NetFloatingIP f : openstackget.getFloatingIp()) {
            Resource FLOATADD = null;
            Resource FIXEDADD = null;
            if (f.getFixedIpAddress() != null && !f.getFixedIpAddress().isEmpty() && f.getFloatingIpAddress() != null && !f.getFloatingIpAddress().isEmpty()) {
                for (Port po : openstackget.getPorts()) {
                    for (IP ips : po.getFixedIps()) {

                        if (ips.getIpAddress().equals(f.getFloatingIpAddress())) {
                            String s = ips.getSubnetId();
                            Subnet sub = openstackget.getSubnet(s);
                            Resource Subnet = model.getResource(topologyURI + ":network+" + openstackget.getResourceName(openstackget.getNetwork(sub.getNetworkId())) + ":subnet+" + openstackget.getResourceName(sub));

                            FLOATADD = RdfOwl.createResource(model, topologyURI + ":subnet+" + openstackget.getResourceName(sub) + ":floatingip+" + f.getFloatingIpAddress(), networkAddress);
                            model.add(model.createStatement(Subnet, hasNetworkAddress, FLOATADD));
                            model.add(model.createStatement(FLOATADD, type, "floating-ip"));
                            model.add(model.createStatement(FLOATADD, value, f.getFloatingIpAddress()));
                        } else if (ips.getIpAddress().equals(f.getFixedIpAddress())) {
                            String s = ips.getSubnetId();
                            Subnet sub = openstackget.getSubnet(s);
                            String subnetId = openstackget.getResourceName(sub);
                            String n = sub.getNetworkId();
                            Network net = openstackget.getNetwork(n);
                            String networkId = openstackget.getResourceName(net);
                            Resource SUBNET = RdfOwl.createResource(model, ResourceTool.getResourceUri(subnetId, OpenstackPrefix.subnet, OpenstackPrefix.uri, networkId, subnetId), switchingSubnet);

                            FIXEDADD = RdfOwl.createResource(model, topologyURI + ":subnet+" + openstackget.getResourceName(sub) + ":fixedip+" + f.getFixedIpAddress(), networkAddress);
                            /*
                            for (Server servers : openstackget.getServers()) {
                                Port pt = openstackget.getPort(f.getPortId());
                                if (servers.getId().equals(pt.getDeviceId())) {
                                    Resource VM = RdfOwl.createResource(model, topologyURI + ":" + "server+" + openstackget.getServereName(servers), node);
                                    model.add(model.createStatement(VM, hasNetworkAddress, FIXEDADD));
                                }
                            }
                            */
                            model.add(model.createStatement(SUBNET, hasNetworkAddress, FIXEDADD));

                            model.add(model.createStatement(FIXEDADD, type, "fixed-ip"));
                            model.add(model.createStatement(FIXEDADD, value, f.getFixedIpAddress()));
                        }

                    }
                }
                // FIXEDADD = RdfOwl.createResource(model, topologyURI + ":port+" + openstackget.getResourceName(po) + ":fixedip+" + f.getFixedIpAddress(), networkAddress);
                //Resource FIXEDADD = RdfOwl.createResource(model, topologyURI + ":port+" + openstackget.getResourceName(openstackget.getPort(f.getPortId())) + ":fixedip+" + f.getFixedIpAddress(), networkAddress);
                try {
                    if (FLOATADD != null && FIXEDADD != null) {
                        model.add(model.createStatement(FIXEDADD, isAlias, FLOATADD));
                        // add assocaited floating ip to VM
                        for (Server server : openstackget.getServers()) {
                            Port pt = openstackget.getPort(f.getPortId());
                            if (server.getId().equals(pt.getDeviceId())) {
                                String PortID = openstackget.getResourceName(pt);
                                Resource PORT = RdfOwl.createResource(model, ResourceTool.getResourceUri(PortID, OpenstackPrefix.PORT, OpenstackPrefix.uri, PortID), biPort);
                                model.add(model.createStatement(PORT, hasNetworkAddress, FLOATADD));
                            }
                        }
                    }
                } catch (Exception e) {
                    throw new Exception(e.toString());
                }

            }
        }
        /*
         StringWriter out = new StringWriter();
         try {
         model.write(out, "TURTLE");
         } catch (Exception e) {
         throw new Exception(String.format("failure to marshall ontology model, due to %s", e.getMessage()));
         }
         String ttl = out.toString();
         System.out.println(ttl);
         System.out.println(ttl);
         */
        
        // combine extra model (static injection)
        if (modelExt != null) {
            model.add(modelExt.getBaseModel());
        }
        return model;
    }

    private static boolean begain_with_uri(String name, String uri) {
        if (name.startsWith(uri)) {
            return true;
        } else {
            return false;
        }
    }
}
