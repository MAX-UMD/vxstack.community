
package net.maxgigapop.mrs.driver.googlecloud;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.RDFNode;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

/**
 *
 * @author Adam Smith
 */
public class GcpQuery {
    /*
    This class contains functions used by GoogleCloudPush for querying the addition
    and reduction model. Having these methods in their own class reduces file bloat.
    */
    private final OntModel modelRef, modelAdd, modelReduct;
    private static final OntModel emptyModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM_MICRO_RULE_INF);
    //private static final String defaultRegion = "us-central1";
    //private static final String defaultZone = "us-central1-c";
    private String jsonAuth, projectID, defaultImage, defaultInstanceType, defaultDiskType, defaultDiskSize, defaultRegion, defaultZone;
    private GcpGet gcpGet;
    private HashMap<String, String> uriNames, subnetRegions, instanceZones;
    
    public GcpQuery(OntModel modelRef, OntModel modelAdd, OntModel modelReduct, Map<String, String> properties) {
        this.modelRef = modelRef;
        this.modelAdd = modelAdd;
        this.modelReduct = modelReduct;
        
        jsonAuth = properties.get("jsonAuth");
        projectID = properties.get("projectID");
        gcpGet = new GcpGet(jsonAuth, projectID);
        //Maps from uris to resource names
        uriNames = new HashMap<>();     //map from URIs to names
        subnetRegions = new HashMap<>();//map from subnet URIs to regions
        instanceZones = new HashMap<>();//map from instance URIs to zones
        
        //get metadata
        HashMap<String, String> metadata = gcpGet.getCommonMetadata();
        JSONArray result;

        //Put all vpcs into the uri lookup table
        result = (JSONArray) gcpGet.getVPCs().get("items");
        for (Object o : result) {
            JSONObject vpcInfo = (JSONObject) o;
            String name = vpcInfo.get("name").toString();
            String key = GcpModelBuilder.getResourceKey("vpc", name);
            
            JSONArray subnetsInfo = (JSONArray) vpcInfo.get("subnetworks");
            for (Object o2 : subnetsInfo) {
                JSONObject subnetInfo = (JSONObject) o;
                String subnetName = GcpGet.parseGoogleURI(o2.toString(), "subnetworks");
                String region = GcpGet.parseGoogleURI(o2.toString(), "regions");
                String subnetKey = GcpModelBuilder.getResourceKey("subnet", name, region, subnetName);
                if (metadata.containsKey(subnetKey)) {
                    uriNames.put(metadata.get(subnetKey), subnetName);
                    subnetRegions.put(metadata.get(subnetKey), region);
                } else {
                    System.out.printf("subnet %s %s %s has no uri entry\n", name, region, subnetName);
                }
            }
            
            if (metadata.containsKey(key)) {
                uriNames.put(metadata.get(key), name);
            } else {
                System.out.printf("vpc %s has no uri entry\n", name);
            }
        }

        //Put all instances into uri lookup table
        result = gcpGet.getAggregatedVmInstances();
        for (Object o : result) {
            JSONObject vmInfo = (JSONObject) o;
            String zone = GcpGet.parseGoogleURI(vmInfo.get("zone").toString(), "zones");
            String name = vmInfo.get("name").toString();
            String key = GcpModelBuilder.getResourceKey("vm", zone, name);
            if (metadata.containsKey(key)) {
                uriNames.put(metadata.get(key), name);
                instanceZones.put(metadata.get(key), zone);
            } else {
                System.out.printf("vm %s %s has no uri entry\n", zone, name);
            }
        }
        
        defaultImage = properties.get("defaultImage");
        defaultInstanceType = properties.get("defaultInstanceType");
        defaultDiskType = properties.get("defaultDiskType");
        defaultDiskSize = properties.get("defaultDiskSize");
        defaultRegion = properties.get("defaultRegion");
        defaultZone = properties.get("defaultZone");
    }
    
    //need name, zone
    public JSONArray createInstanceRequests() {
        JSONArray output = new JSONArray();
        String method = "createInstanceRequests";
        //need type, vpc, subnet, ip, disk size
        //name, zone, sourceImage, diskType are optional
        //zone, sourceImage, and diskType are derived from type
        String query = "SELECT ?uri ?name ?type \n"
                + "WHERE { ?vpc a nml:Topology ; nml:hasNode ?uri . ?uri a nml:Node \n"
                + "OPTIONAL { ?uri mrs:type ?type } \n"
                + "OPTIONAL { ?uri nml:name ?name } }";
        
        ResultSet r = executeQuery(query, emptyModel, modelAdd);
        while (r.hasNext()) {
            JSONObject instanceRequest = new JSONObject();
            QuerySolution solution = r.next();
            HashMap<String, String> typeInfo = parseTypeStr(getOrDefault(solution, "type", null));
            String instanceUri = solution.get("uri").toString();
            String instanceName = getOrDefault(solution, "name", makeNameFromUri("vm", instanceUri));
            //remove invalid characters such as underscores
            instanceName = removeChars(instanceName).toLowerCase();
            
            String machineType = getOrDefault(typeInfo, "instance", defaultInstanceType);
            String sourceImage = getOrDefault(typeInfo, "image", defaultImage);
            String zone = getOrDefault(typeInfo, "zone", defaultZone);
            String diskType = getOrDefault(typeInfo, "diskType", defaultDiskType);
            String diskSize = getOrDefault(typeInfo, "diskSizeGb", defaultDiskSize);
            
            String nicQuery = "SELECT ?ip ?subnetUri ?vpcUri \n"
                    + "WHERE { BIND(<" + instanceUri + "> AS ?uri) \n"
                    + "?uri nml:hasBidirectionalPort ?nic . \n"
                    + "?nic a nml:BidirectionalPort ; mrs:hasNetworkAddress ?nicAddr .\n"
                    + "?nicAddr a mrs:NetworkAddress ; mrs:value ?ip \n"
                    + "OPTIONAL { ?subnetUri a mrs:SwitchingSubnet ; nml:hasBidirectionalPort ?nic . \n"
                    + "?vpcUri a nml:Topology ; nml:hasService ?switchingService . \n"
                    + "?switchingService a mrs:SwitchingService ; mrs:providesSubnet ?subnetUri . } }";
            
            int i = 0;
            
            JSONArray nics = new JSONArray();
            JSONObject nicInfo;
            ResultSet nicResult = executeQuery(nicQuery, emptyModel, modelAdd);
            while (nicResult.hasNext()) {
                QuerySolution nicSolution = nicResult.next();
                nicInfo = new JSONObject();
                
                nicInfo.put("nic", i++);
                //either both vpc and subnet will be found, or neither
                if (nicSolution.contains("subnetUri") && nicSolution.contains("vpcUri")) {
                    String subnetUri = nicSolution.get("subnetUri").toString();
                    String vpcUri = nicSolution.get("vpcUri").toString();
                    //if the name for either subnet is vpc, make one from uri
                    nicInfo.put("subnet", getOrDefault(uriNames, subnetUri, makeNameFromUri("subnet", subnetUri)));
                    nicInfo.put("vpc", getOrDefault(uriNames, vpcUri, makeNameFromUri("vpc", vpcUri)));
                } else {
                    nicInfo.put("subnet", "default");
                    nicInfo.put("vpc", "default");
                }
                
                nicInfo.put("region", defaultRegion);
                
                if (nicSolution.contains("ip")) {
                    nicInfo.put("ip", nicSolution.get("ip").toString());
                }
                
                nics.add(nicInfo);
                System.out.printf("found nic: %s\n", nicInfo);
            }
            
            if (nics.isEmpty()) {
                //every instance must contain at least 1 nic
                nicInfo = new JSONObject();
                nicInfo.put("nic", "0");
                nicInfo.put("subnet", "default");
                nicInfo.put("vpc", "default");
                nicInfo.put("region", defaultRegion);
                nics.add(nicInfo);
            }
            
            instanceRequest.put("type", "create_instance");
            instanceRequest.put("uri", instanceUri);
            instanceRequest.put("name", instanceName);
            instanceRequest.put("machineType", machineType);
            instanceRequest.put("sourceImage", sourceImage);
            instanceRequest.put("zone", zone);
            instanceRequest.put("diskType", diskType);
            instanceRequest.put("diskSize", diskSize);
            instanceRequest.put("nics", nics);
            
            //Add the name and uri pair to the lookup table for future dependencies.
            uriNames.put(instanceUri, instanceName);
            
            System.out.printf("CREATE INSTANCE REQUEST: %s\n", instanceRequest);
            output.add(instanceRequest);
        }
        
        return output;
    }
    
    public ArrayList<JSONObject> deleteInstanceRequests() {
        ArrayList<JSONObject> output = new ArrayList<>();
        String method = "deleteInstanceRequests";
        
        String query = "SELECT ?uri WHERE { ?vpc a nml:Topology ; nml:hasNode ?uri . ?uri a nml:Node . } ";
        
        ResultSet r = executeQuery(query, emptyModel, modelReduct);
        while (r.hasNext()) {
            JSONObject instanceRequest = new JSONObject();
            QuerySolution solution = r.next();
            
            String uri = solution.get("uri").toString();
            String name = uriNames.get(uri);
            String zone = instanceZones.get(uri);
            
            instanceRequest.put("type", "delete_instance");
            instanceRequest.put("uri", uri);
            instanceRequest.put("name", name);
            instanceRequest.put("zone", zone);
            
            System.out.printf("DELETE INSTANCE REQUEST: %s\n", instanceRequest);
            output.add(instanceRequest);
        }
        
        
        return output;
    }
    
    public ArrayList<JSONObject> createSubnetRequests() {
        ArrayList<JSONObject> output = new ArrayList<>();
        String method = "createSubnetRequests";
        
        //the newlines make debugging these queries much easier.
        //subnet region and name are optional. vpcname is used to build
        String query = "SELECT ?vpcUri ?vpcName ?subnetUri ?subnetName ?subnetCIDR ?subnetRegion\n"
                + "WHERE { ?service mrs:providesVPC ?vpcUri . \n"
                + "?vpcUri a nml:Topology ; nml:hasService ?switchingService . \n"
                + "?switchingService a mrs:SwitchingService ; \n"
                + "mrs:providesSubnet ?subnetUri . \n"
                + "?subnetUri a mrs:SwitchingSubnet ; mrs:hasNetworkAddress ?addressUri . \n"
                + "?addressUri a mrs:NetworkAddress ; mrs:value ?subnetCIDR \n"
                + "OPTIONAL { ?vpcUri nml:name ?vpcName } \n"
                + "OPTIONAL { ?subnetUri nml:name ?subnetName } \n"
                + "OPTIONAL { ?subnetUri mrs:type ?subnetRegion } }";
        
        ResultSet r = executeQuery(query, emptyModel, modelAdd);
        while (r.hasNext()) {
            JSONObject subnetRequest = new JSONObject();
            QuerySolution solution = r.next();
            String vpcUri = solution.get("vpcUri").toString();
            String vpcName = getOrDefault(solution, "vpcName", makeNameFromUri("vpc", vpcUri));
            String subnetUri = getOrDefault(solution, "subnetUri", "error");
            String subnetCIDR = getOrDefault(solution, "subnetCIDR", "error");
            String subnetName = getOrDefault(solution, "subnetName", null);
            String subnetRegion = getOrDefault(solution, "subnetRegion", defaultRegion);
            
            if (subnetName == null) {
                //if the subnet name was not provided, create it
                subnetName = makeNameFromUri("subnet", subnetUri);
            } else {
                //else, remove any invalid characters
                subnetName = removeChars(subnetName);
            }
            
            subnetRequest.put("type", "create_subnet");
            subnetRequest.put("vpcName", vpcName);
            subnetRequest.put("uri", subnetUri);
            subnetRequest.put("cidr", subnetCIDR);
            subnetRequest.put("name", subnetName);
            subnetRequest.put("region", subnetRegion);
            
            //Add the name and uri pair to the lookup table for future dependencies.
            uriNames.put(subnetUri, subnetName);
            subnetRegions.put(subnetUri, subnetRegion);
            System.out.printf("CREATE SUBNET REQUEST: %s\n", subnetRequest);
            output.add(subnetRequest);
        }
        
        return output;
    }
    
    public ArrayList<JSONObject> deleteSubnetRequests() {
        ArrayList<JSONObject> output = new ArrayList<>();
        String method = "deleteSubnetRequests";
        
        String query = "SELECT ?vpcUri ?subnetUri\n"
                + "WHERE { ?service mrs:providesVPC ?vpcUri . \n"
                + "?vpcUri a nml:Topology ; nml:hasService ?switchingService . \n"
                + "?switchingService a mrs:SwitchingService ; mrs:providesSubnet ?subnetUri . \n"
                + "?subnetUri a mrs:SwitchingSubnet . }";
        
        ResultSet r = executeQuery(query, emptyModel, modelReduct);
        while (r.hasNext()) {
            JSONObject subnetRequest = new JSONObject();
            QuerySolution solution = r.next();
            
            String vpcUri = solution.get("vpcUri").toString();
            String vpcName = uriNames.get("vpcUri");
            String uri = solution.get("subnetUri").toString();
            String region = subnetRegions.get(uri);
            String name = uriNames.get(uri);
            
            subnetRequest.put("type", "delete_subnet");
            subnetRequest.put("vpcName", vpcName);
            subnetRequest.put("uri", uri);
            subnetRequest.put("region", region);
            subnetRequest.put("name", name);
            
            System.out.printf("DELETE SUBNET REQUEST: %s\n", subnetRequest);
            output.add(subnetRequest);
        }
        
        return output;
    }
    
    //Need name
    public ArrayList<JSONObject> createVpcRequests() {
        ArrayList<JSONObject> output = new ArrayList<>();
        String method = "createVpcRequests";
        //Find an object that provides a vpc to something else, and is a topology
        //Name is optional. Only URI is mandatory
        String query = "SELECT ?vpcUri ?vpcName"
                + "WHERE { ?service mrs:providesVPC ?vpcUri . ?vpcUri a nml:Topology ;"
                + "OPTIONAL { ?vpcUri nml:name ?vpcName} }";
        
        ResultSet r = executeQuery(query, emptyModel, modelAdd);
        while (r.hasNext()) {
            JSONObject vpcRequest = new JSONObject();
            QuerySolution solution = r.next();
            String vpcUri = solution.get("vpcUri").toString();
            String vpcName = getOrDefault(solution, "vpcName", makeNameFromUri("vpc", vpcUri));
            
            vpcRequest.put("type", "create_vpc");
            vpcRequest.put("name", vpcName);
            vpcRequest.put("uri", vpcUri);
            
            //Add the name and uri pair to the lookup table for future dependencies.
            uriNames.put(vpcUri, vpcName);
            
            System.out.printf("CREATE VPC REQUEST: %s\n", vpcRequest);
            output.add(vpcRequest);
        }
        return output;
    }
    
    public ArrayList<JSONObject> deleteVpcRequests() {
        ArrayList<JSONObject> output = new ArrayList<>();
        String method = "deleteVpcRequests";
        String query = "SELECT ?vpcUri"
                + "WHERE { ?service mrs:providesVPC ?vpcUri . ?vpcUri a nml:Topology }";
                
        ResultSet r = executeQuery(query, emptyModel, modelReduct);
        while (r.hasNext()) {
            JSONObject vpcRequest = new JSONObject();
            QuerySolution solution = r.next();
            String uri = solution.get("vpcUri").toString();
            String name = uriNames.get(uri);
            vpcRequest.put("type", "delete_vpc");
            vpcRequest.put("uri", uri);
            vpcRequest.put("name", name);
            
            System.out.printf("DELETE VPC REQUEST: %s\n", vpcRequest);
            output.add(vpcRequest);
        }
        
        return output;
    }
    
    public static String makeNameFromUri(String type, String uri) {
        //given a uri, returns a string that can be used to name a resource.
        //useful when a name for a resource is not available in model
        
        String output = String.format("%s-%s", type, uri.substring(23, 60));
        return removeChars(output);
    }
    
    //Removes non-alphanumeric non-hyphen characters from strings
    public static String removeChars (String input) {
        return input.replaceAll("[^a-zA-Z0-9\\-]", "");
    }
    
    private static String getOrDefault(QuerySolution q, String key, String def) {
        //This checks q for the key value, and returns the default if it is not found
        if (q.contains(key)) {
            return q.get(key).toString();
        } else {
            return def;
        }
    }
    
    private static String getOrDefault(HashMap<String, String> h, String key, String def) {
        //This checks q for the key value, and returns the default if it is not found
        if (h.containsKey(key)) {
            return h.get(key).toString();
        } else {
            return def;
        }
    }
    
    /* ****************************************************************
     * function that executes a query using a model addition/subtraction and a
     * reference model, returns the result of the query
     * ****************************************************************/
    private ResultSet executeQuery(String queryString, OntModel refModel, OntModel model) {
        queryString = "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"
                    + "prefix owl: <http://www.w3.org/2002/07/owl#>\n"
                    + "prefix nml: <http://schemas.ogf.org/nml/2013/03/base#>\n"
                    + "prefix mrs: <http://schemas.ogf.org/mrs/2013/12/topology#>\n"
                    + queryString;

        //get all the nodes that will be added
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet r = qexec.execSelect();

        //check on reference model if the statement is not in the model addition,
        //or model subtraction
        if (!r.hasNext()) {
            qexec = QueryExecutionFactory.create(query, refModel);
            r = qexec.execSelect();
        }
        return r;
    }
    
    /**
     * ****************************************************************
     * function that executes a query using a model addition/subtraction and a
     * reference model, returns the result of the query
     * ****************************************************************
     */
    private ResultSet executeQueryUnion(String queryString, OntModel refModel, OntModel model) {
        queryString = "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"
                + "prefix owl: <http://www.w3.org/2002/07/owl#>\n"
                + "prefix nml: <http://schemas.ogf.org/nml/2013/03/base#>\n"
                + "prefix mrs: <http://schemas.ogf.org/mrs/2013/12/topology#>\n"
                + queryString;

        Model unionModel = ModelFactory.createUnion(refModel, model);

        //get all the nodes that will be added
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, unionModel);
        ResultSet r = qexec.execSelect();
        return r;
    }

    public static HashMap<String, String> parseTypeStr(String typeStr) {
        HashMap<String, String> output = new HashMap<>();
        if (typeStr == null) return output;
        String key, value, pairs[] = typeStr.split(",");
        int pos;
        
        for (String s : pairs) {
            pos = s.indexOf("+");
            key = s.substring(0, pos);
            value = s.substring(pos+1);
            output.put(key, value);
        }
        
        return output;
    }
    
    public static String createTypeStr(HashMap<String, String> properties) {
        String output = "";
        
        if (properties != null) {
            for (String key : properties.keySet()) {
                if (output.length() > 0 ) {
                    output += ",";
                }
                output += String.format("%s+%s", key, properties.get(key));
            }
        }
        
        return output;
    } 
    
}
