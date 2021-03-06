package templateengine.helpers.vcn;

import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import templateengine.helpers.Helper;

public class isAWS implements Helper {

    @Override
    public String apply(ArrayList<Object> obj) {
        JSONObject root = (JSONObject) obj.get(0);
        if (root.containsKey("options") && contains((JSONArray) root.get("options"), "aws-form")
                || ((String) root.get("parent")).contains("amazon")) {
            return "true";
        }
        return "false";
    }
    
    private boolean contains(JSONArray jsonArray, String key) {
        return jsonArray.toString().contains("\"" + key + "\"");
    }
}
