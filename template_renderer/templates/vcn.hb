<serviceDelta>
<uuid>{{uuid}}</uuid>
<workerClassPath>net.maxgigapop.mrs.service.orchestrate.SimpleWorker</workerClassPath>

<modelAddition>

@prefix rdfs:  &lt;http://www.w3.org/2000/01/rdf-schema#&gt; .
@prefix owl:   &lt;http://www.w3.org/2002/07/owl#&gt; .
@prefix xsd:   &lt;http://www.w3.org/2001/XMLSchema#&gt; .
@prefix rdf:   &lt;http://schemas.ogf.org/nml/2013/03/base#&gt; .
@prefix nml:   &lt;http://schemas.ogf.org/nml/2013/03/base#&gt; .
@prefix mrs:   &lt;http://schemas.ogf.org/mrs/2013/12/topology#&gt; .
@prefix spa:   &lt;http://schemas.ogf.org/mrs/2015/02/spa#&gt; .

&lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_clouds:tag+vpc1&gt;
    a                         nml:Topology ;
{{#gateways}}
{{#if_eq type 'AWS Direct Connect'}}
    spa:dependOn &lt;x-policy-annotation:action:create-vpc&gt;, &lt;x-policy-annotation:action:create-mce_dc1&gt; .

&lt;urn:ogf:network:vo1_maxgigapop_net:link=conn1&gt;
    a            mrs:SwitchingSubnet;
    spa:type     spa:Abstraction;
    spa:dependOn &lt;x-policy-annotation:action:create-path&gt;.

&lt;x-policy-annotation:action:create-path&gt;
    a            spa:PolicyAction ;
    spa:type     "MCE_MPVlanConnection" ;
    spa:importFrom &lt;x-policy-annotation:data:conn-criteria1&gt; ;
    spa:exportTo &lt;x-policy-annotation:data:conn-export&gt; .

&lt;x-policy-annotation:action:create-mce_dc1&gt;
    a            spa:PolicyAction ;
    spa:type     "MCE_AwsDxStitching" ;
    spa:importFrom &lt;x-policy-annotation:data:vpc-export&gt;, &lt;x-policy-annotation:data:conn-export&gt; ;
    spa:dependOn &lt;x-policy-annotation:action:create-vpc&gt;, &lt;x-policy-annotation:action:create-path&gt;.

&lt;x-policy-annotation:data:vpc-export&gt;
    a            spa:PolicyData ;
    spa:type     "JSON" ;
    spa:format   '{{PolicyData parent=../parent stitch_from="%$.gateways[?(@.type=='vpn-gateway')].uri%"}}'.

&lt;x-policy-annotation:data:conn-export&gt;
    a            spa:PolicyData;
    spa:type     "JSON" ;
    spa:format   '{
    {{! discrepancy with wiki }}
        "to_l2path": "%$.urn:ogf:network:vo1_maxgigapop_net:link=conn1%"
    }' .

&lt;x-policy-annotation:data:conn-criteria1&gt;
    a            spa:PolicyData;
    spa:type     "JSON";
    spa:value    '{
    {{! TODO }}
        "urn:ogf:network:vo1_maxgigapop_net:link=conn1": {
            "{{to}}": {
                "vlan_tag":" + vlan + "
            },
            "{{parent}}": {
                "vlan_tag":" + vlan + "
            }
        }
    }'.
{{else}}
    spa:dependOn &lt;x-policy-annotation:action:create-vpc&gt; .
{{/if_eq}}
{{/gateways}}

{{#if_aws .}}
{{#subnets}}
{{#vms}}
&lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_machines:tag+{{name}}&gt;
    a           nml:Node ;
    nml:name    "{{name}}";
    nml:hasBidirectionalPort   &lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_machines:tag+{{name}}:eth0&gt;;
    spa:dependOn &lt;x-policy-annotation:action:create-{{name}}&gt; .

&lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_machines:tag+{{name}}:eth0&gt;
    a           nml:BidirectionalPort;
    spa:dependOn &lt;x-policy-annotation:action:create-{{name}}&gt;
    {{~#interfaces}}
        {{~#if_eq type 'Ethernet'}}
        {{~#if address}} ;
    mrs:hasNetworkAddress &lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_machines:tag+{{name}}:eth0:floating&gt;.

&lt;urn:ogf:network:service+{{refUuid}}:resource+virtual_machines:tag+{{name}}:eth0:floating&gt;
    a            mrs:NetworkAddress;
    mrs:type     "floating-ip";
    mrs:value     "{{addressString name interfaces refUuid}}" .
        {{~else}} .
        {{/if}}
        {{/if_eq}}
    {{/interfaces}}

&lt;x-policy-annotation:action:create-{{refUuid}}&gt;
    a            spa:PolicyAction ;
    spa:type     "MCE_VMFilterPlacement" ;
    spa:dependOn &lt;x-policy-annotation:action:create-vpc&gt; ;
    spa:importFrom  &lt;x-policy-annotation:data:vpc-subnet-{{refUuid}}-criteria&gt;.

&lt;x-policy-annotation:data:vpc-subnet-{{refUuid}}-criteria&gt;
    a           spa:PolicyData;
    spa:type    "JSON";
    spa:format  """{
        "place_into": "%$.subnets[{{@index}}].uri%"}""" .
{{/vms}}
{{/subnets}}
{{/if_aws}}
{{#if_ops .}}
{{#subnets}}
{{#vms}}
ops vm data
{{/vms}}
{{/subnets}}
{{/if_ops}}

&lt;x-policy-annotation:action:create-vpc&gt;
    a           spa:PolicyAction ;
    spa:type     "MCE_VirtualNetworkCreation" ;
    spa:importFrom &lt;x-policy-annotation:data:vpc-criteria&gt;

{{#subnets}}
{{#if vms}}
;
    spa: exportTo &lt;x-policy-annotation:data:vpc-export&gt;,  
{{~#vms}}
&lt;x-policy-annotation:data:vpc-subnet-" + vmPara[0] + "-criteria&gt;{{#unless @last}},{{/unless}}
{{/vms}}
{{else}}
.
{{/if}}
{{/subnets}}

&lt;x-policy-annotation:data:vpc-criteria&gt;
    a            spa:PolicyData;
    spa:type     nml:Topology;
    spa:value    '{{PolicyData type=type cidr=cidr parent=parent subnets=subnets routes=gateways/routes gateways=gateways}}'.

</modelAddition>

</serviceDelta>
