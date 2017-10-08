package templateengine;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import templateengine.helpers.vcn.AddressString;
import templateengine.helpers.vcn.DirectConnDest;
import templateengine.helpers.vcn.DirectConnVLAN;
import templateengine.helpers.vcn.ExportData;
import templateengine.helpers.vcn.LinkedGatewayFrom;
import templateengine.helpers.vcn.LinkedGatewayType;
import templateengine.helpers.vcn.TopologyPolicyData;
import templateengine.helpers.vcn.VMType;
import templateengine.helpers.vcn.VPCSubnetData;
import templateengine.helpers.vcn.ifVCNGateways;
import templateengine.helpers.vcn.isAWS;
import templateengine.helpers.vcn.isOPS;

public class AHCTemplate extends Template {

    public AHCTemplate() {
        super();
        // Load template
        InputStream fileStream = AHCTemplate.class.getResourceAsStream("/ahc.svt");
        template = null;
        try (Scanner scanner = new Scanner(fileStream, StandardCharsets.UTF_8.name())) {
            template = scanner.useDelimiter("\\A").next();
        }

        // Load helpers
        helpers.put("TopologyPolicyData", new TopologyPolicyData());
        helpers.put("VPCSubnetData", new VPCSubnetData());
        helpers.put("ExportData", new ExportData());
        helpers.put("ifVCNGateways", new ifVCNGateways());
        helpers.put("DirectConnDest", new DirectConnDest());
        helpers.put("DirectConnVLAN", new DirectConnVLAN());
        helpers.put("isAWS", new isAWS());
        helpers.put("isOPS", new isOPS());
        helpers.put("VMType", new VMType());
        helpers.put("AddressString", new AddressString());
        helpers.put("LinkedGatewayType", new LinkedGatewayType());
        helpers.put("LinkedGatewayFrom", new LinkedGatewayFrom());
    }
}
