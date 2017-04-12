define({ "api": [
  {
    "type": "delete",
    "url": "/app/acl/:refUUID",
    "title": "Delete ACL Entry",
    "description": "<p>Delete subject associated with object specified by UUID.</p>",
    "version": "1.0.0",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>subject ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -H \"Content-Type: application/json\" -d \"test1\"\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "DeleteAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "GET",
    "url": "/app/acl/:refUUID",
    "title": "Get ACL Entries",
    "version": "1.0.0",
    "description": "<p>Get all entries associated with object specified by UUID.</p>",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users",
            "description": "<p>users JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users.user",
            "description": "<p>user JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.name",
            "description": "<p>full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.email",
            "description": "<p>email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"admin\",\"\",null]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "GetAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/acl/:refUUID",
    "title": "Add ACL Entry",
    "version": "1.0.0",
    "description": "<p>Add subject pairing to object specified by UUID.</p>",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>subject ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -H \"Content-Type: application/json\" -d \"test1\"\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "PostAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/driver/:username/delete/:topuri",
    "title": "Delete Driver Profile",
    "version": "1.0.0",
    "description": "<p>Delete saved driver profile.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "DeleteAppDriverUsernameDeleteTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/driver/:user/get",
    "title": "Get Profile Information",
    "version": "1.0.0",
    "description": "<p>Get saved driver profile information.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "GetAppDriverUserGet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/driver/:username/getdetails/:topuri",
    "title": "Get Driver Profile",
    "version": "1.0.0",
    "description": "<p>Get saved driver profile.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "GetAppDriverUsernameGetdetailsTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/install",
    "title": "Install Driver",
    "version": "1.0.0",
    "description": "<p>Install driver from JSON</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "dataInput",
            "description": "<p>driver json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example JSON:",
          "content": "{\nTODO - Add Example JSON\n}",
          "type": "JSONObject"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverInstall",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/:user/add",
    "title": "Add Driver Profile",
    "version": "1.0.0",
    "description": "<p>Add new StackV profile</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "dataInput",
            "description": "<p>profile JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example JSON:",
          "content": "{\nTODO - Add Example JSON\n}",
          "type": "JSONObject"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "JSONObject"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverUserAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/:user/install/:topuri",
    "title": "Install Driver Profile",
    "version": "1.0.0",
    "description": "<p>Install driver from StackV profile</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverUserInstallTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Remove User from Group",
    "version": "1.0.0",
    "description": "<p>Retract group membership from a user</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>group name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -d '{\"id\":\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"name\":\"TeamA\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "DeleteAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Delete User Role",
    "version": "1.0.0",
    "description": "<p>Remove a directly assigned role from the specified user.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>role name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -d '{\"id\":\"056af27f-b754-4287-aebe-129f5de8ab47\",\"name\":\"Services\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "DeleteAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/groups",
    "title": "Get Groups",
    "version": "1.0.0",
    "description": "<p>Get a list of existing groups.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups",
            "description": "<p>groups JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups.group",
            "description": "<p>group JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.name",
            "description": "<p>group name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"TeamA\"],[\"968ee80f-92a0-42c4-8f19-fe502d41480a\",\"offline_access\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/roles",
    "title": "Get Roles",
    "version": "1.0.0",
    "description": "<p>Get a list of existing roles.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles",
            "description": "<p>roles JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles.role",
            "description": "<p>role JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.name",
            "description": "<p>role name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"e619f97d-9811-4612-82f7-fa01fbbf0515\",\"Drivers\"],[\"a08da95a-9c90-4dca-96db-0903cc8f82fa\",\"Labels\"],[\"f12ad2d8-2f7b-4e12-9cfe-d264d13e96fc\",\"Keycloak\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users",
    "title": "Get Users",
    "version": "1.0.0",
    "description": "<p>Get a list of existing users.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/users\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users",
            "description": "<p>users JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users.user",
            "description": "<p>user JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.name",
            "description": "<p>full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.email",
            "description": "<p>email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.time",
            "description": "<p>timestamp of user creation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.subject",
            "description": "<p>user ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"admin\",\"\",null,\"1475506393070\",\"1d183570-2798-4d69-80c3-490f926596ff\"],[\"username\",\"\",\"email\",\"1475506797561\",\"1323ff3d-49f3-46ad-8313-53fd4c711ec6\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Get User Groups",
    "version": "1.0.0",
    "description": "<p>Get a list of groups specified user belongs to.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups",
            "description": "<p>groups JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups.group",
            "description": "<p>group JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.name",
            "description": "<p>group name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"TeamA\"],[\"6f299a2f-185b-4784-a135-b861179af17d\",\"admin\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Get User Roles",
    "version": "1.0.0",
    "description": "<p>Get a list of roles the user has assigned.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles",
            "description": "<p>roles JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles.role",
            "description": "<p>role JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.name",
            "description": "<p>role name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.source",
            "description": "<p>role source, either &quot;assigned&quot; or the name of group who delegates the role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"056af27f-b754-4287-aebe-129f5de8ab47\",\"Services\",\"assigned\"],[\"a08da95a-9c90-4dca-96db-0903cc8f82fa\",\"Labels\",\"admin\"],[\"7d307d71-1b89-45f7-a0be-3b0f0d1b2045\",\"Manifests\",\"admin\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Add User to Group",
    "version": "1.0.0",
    "description": "<p>Assign group membership to a user</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>group name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d '{\"id\":\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"name\":\"TeamA\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "PostAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Add User Role",
    "version": "1.0.0",
    "description": "<p>Directly assign a role to specified user.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>role name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d '{\"id\":\"056af27f-b754-4287-aebe-129f5de8ab47\",\"name\":\"Services\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "PostAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/label/:username/clearall",
    "title": "Clear Labels",
    "version": "1.0.0",
    "description": "<p>Delete all labels owned by specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "DeleteAppLabelUsernameClearall",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/label/:username/delete/:identifier",
    "title": "Delete Label",
    "version": "1.0.0",
    "description": "<p>Delete identified label owned by specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>label ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "DeleteAppLabelUsernameDeleteIdentifier",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/label/:user",
    "title": "",
    "version": "1.0.0",
    "description": "<p>Get a list of labels belonging to the specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "GetAppLabelUser",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/label",
    "title": "Add Label",
    "version": "1.0.0",
    "description": "<p>Add a new label.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>TODO - Add Parameter Structure</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "PutAppLabel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/logging/",
    "title": "Get Logging",
    "version": "1.0.0",
    "description": "<p>Get system logging level.</p>",
    "group": "Logging",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/ -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>logging level</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "info",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "GetAppLogging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/logging/logs/:refUUID:level",
    "title": "Get Logs",
    "version": "1.0.0",
    "description": "<p>Get logs associated with an instance.</p>",
    "group": "Logging",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>service instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/logs/e4d3bfd6-c269-4063-b02b-44aaef71d5b6 -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "logs",
            "description": "<p>logs JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONObject",
            "optional": false,
            "field": "logs.log",
            "description": "<p>log JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.marker",
            "description": "<p>log marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.timestamp",
            "description": "<p>log timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.level",
            "description": "<p>log level</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.logger",
            "description": "<p>log source</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.message",
            "description": "<p>log message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.exception",
            "description": "<p>log exception</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[\n{\n\"exception\": \"\",\n\"level\": \"INFO\",\n\"marker\": \"\",\n\"logger\": \"net.maxgigapop.mrs.rest.api.WebResource\",\n\"message\": \"Initialized.\",\n\"timestamp\": \"2017-03-17 12:23:16.0\"\n},\n...]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "GetAppLoggingLogsRefuuidLevel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/logging/:level",
    "title": "Set Logging",
    "version": "1.0.0",
    "description": "<p>Set system logging level.</p>",
    "group": "Logging",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>logging level, one of the following: TRACE, DEBUG, INFO, WARN, ERROR</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/trace -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "PutAppLoggingLevel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/manifest/:svcUUID",
    "title": "Get Manifest",
    "version": "1.0.0",
    "description": "<p>Get manifest for specified service instance.</p>",
    "group": "Manifests",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "svcUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Manifests",
    "name": "GetAppManifestSvcuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/profile/:wizardID",
    "title": "Delete Profile",
    "version": "1.0.0",
    "description": "<p>Delete specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE http://localhost:8080/StackV-web/restapi/app/profile/11\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "DeleteAppProfileWizardid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/profile/:wizardID",
    "title": "Get Profile",
    "version": "1.0.0",
    "description": "<p>Get specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/profile/11\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONObject",
            "optional": false,
            "field": "wizard_json",
            "description": "<p>Profile JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "{\"username\": \"admin\",\"type\": \"netcreate\",\"alias\": \"VCN.OPS.1VM_Ext.233\",\"data\": {\"virtual_clouds\": []}}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "GetAppProfileWizardid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/profile/new",
    "title": "Add New Profile",
    "version": "1.0.0",
    "description": "<p>Save a new wizard profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>Profile JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -d @newprofile.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/profile/11/edit\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "PutAppProfileNew",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/profile/:wizardID/edit",
    "title": "Modify Profile",
    "version": "1.0.0",
    "description": "<p>Modify the specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>Profile JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -d @newprofile.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/profile/11/edit\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "PutAppProfileWizardidEdit",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/service/:siUUID/status",
    "title": "Check Status",
    "version": "1.0.0",
    "description": "<p>Retrieve full status of specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/status\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Instance status composite, containing both superstate and substate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "Cancel - FAILED",
          "type": "String"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "GetAppServiceSiuuidStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/service/:siUUID/substatus",
    "title": "Check Substatus",
    "version": "1.0.0",
    "description": "<p>Retrieve substatus of specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/substatus\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Instance substatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "FAILED",
          "type": "String"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "GetAppServiceSiuuidSubstatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/service",
    "title": "Create Service",
    "version": "1.0.0",
    "description": "<p>Create new service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>service JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d @newservice.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/service\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "PostAppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/service/:siUUID/:action",
    "title": "Operate Service",
    "version": "1.0.0",
    "description": "<p>Operate on the specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>operation to execute</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/cancel\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "PutAppServiceSiuuidAction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  }
] });
=======
define({ "api": [
  {
    "type": "delete",
    "url": "/app/acl/:refUUID",
    "title": "Delete ACL Entry",
    "description": "<p>Delete subject associated with object specified by UUID.</p>",
    "version": "1.0.0",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>subject ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -H \"Content-Type: application/json\" -d \"test1\"\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "DeleteAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "GET",
    "url": "/app/acl/:refUUID",
    "title": "Get ACL Entries",
    "version": "1.0.0",
    "description": "<p>Get all entries associated with object specified by UUID.</p>",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users",
            "description": "<p>users JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users.user",
            "description": "<p>user JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.name",
            "description": "<p>full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.email",
            "description": "<p>email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"admin\",\"\",null]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "GetAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/acl/:refUUID",
    "title": "Add ACL Entry",
    "version": "1.0.0",
    "description": "<p>Add subject pairing to object specified by UUID.</p>",
    "group": "ACL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>subject ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>object reference UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -H \"Content-Type: application/json\" -d \"test1\"\nhttp://localhost:8080/StackV-web/restapi/app/acl/b7688fef-1911-487e-b5d9-3e9e936599a8\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "ACL",
    "name": "PostAppAclRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/driver/:username/delete/:topuri",
    "title": "Delete Driver Profile",
    "version": "1.0.0",
    "description": "<p>Delete saved driver profile.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "DeleteAppDriverUsernameDeleteTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/driver/:user/get",
    "title": "Get Profile Information",
    "version": "1.0.0",
    "description": "<p>Get saved driver profile information.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "GetAppDriverUserGet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/driver/:username/getdetails/:topuri",
    "title": "Get Driver Profile",
    "version": "1.0.0",
    "description": "<p>Get saved driver profile.</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "GetAppDriverUsernameGetdetailsTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/install",
    "title": "Install Driver",
    "version": "1.0.0",
    "description": "<p>Install driver from JSON</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "dataInput",
            "description": "<p>driver json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example JSON:",
          "content": "{\nTODO - Add Example JSON\n}",
          "type": "JSONObject"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverInstall",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/:user/add",
    "title": "Add Driver Profile",
    "version": "1.0.0",
    "description": "<p>Add new StackV profile</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "dataInput",
            "description": "<p>profile JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example JSON:",
          "content": "{\nTODO - Add Example JSON\n}",
          "type": "JSONObject"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "JSONObject"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverUserAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/driver/:user/install/:topuri",
    "title": "Install Driver Profile",
    "version": "1.0.0",
    "description": "<p>Install driver from StackV profile</p>",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topuri",
            "description": "<p>profile topology uri</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Driver",
    "name": "PutAppDriverUserInstallTopuri",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Remove User from Group",
    "version": "1.0.0",
    "description": "<p>Retract group membership from a user</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>group name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -d '{\"id\":\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"name\":\"TeamA\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "DeleteAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Delete User Role",
    "version": "1.0.0",
    "description": "<p>Remove a directly assigned role from the specified user.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>role name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE -d '{\"id\":\"056af27f-b754-4287-aebe-129f5de8ab47\",\"name\":\"Services\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "DeleteAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/groups",
    "title": "Get Groups",
    "version": "1.0.0",
    "description": "<p>Get a list of existing groups.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups",
            "description": "<p>groups JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups.group",
            "description": "<p>group JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.name",
            "description": "<p>group name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"TeamA\"],[\"968ee80f-92a0-42c4-8f19-fe502d41480a\",\"offline_access\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/roles",
    "title": "Get Roles",
    "version": "1.0.0",
    "description": "<p>Get a list of existing roles.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles",
            "description": "<p>roles JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles.role",
            "description": "<p>role JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.name",
            "description": "<p>role name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"e619f97d-9811-4612-82f7-fa01fbbf0515\",\"Drivers\"],[\"a08da95a-9c90-4dca-96db-0903cc8f82fa\",\"Labels\"],[\"f12ad2d8-2f7b-4e12-9cfe-d264d13e96fc\",\"Keycloak\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users",
    "title": "Get Users",
    "version": "1.0.0",
    "description": "<p>Get a list of existing users.</p>",
    "group": "Keycloak",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/users\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users",
            "description": "<p>users JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "users.user",
            "description": "<p>user JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.name",
            "description": "<p>full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.email",
            "description": "<p>email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.time",
            "description": "<p>timestamp of user creation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.user.subject",
            "description": "<p>user ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"admin\",\"\",null,\"1475506393070\",\"1d183570-2798-4d69-80c3-490f926596ff\"],[\"username\",\"\",\"email\",\"1475506797561\",\"1323ff3d-49f3-46ad-8313-53fd4c711ec6\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Get User Groups",
    "version": "1.0.0",
    "description": "<p>Get a list of groups specified user belongs to.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups",
            "description": "<p>groups JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "groups.group",
            "description": "<p>group JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.group.name",
            "description": "<p>group name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"TeamA\"],[\"6f299a2f-185b-4784-a135-b861179af17d\",\"admin\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Get User Roles",
    "version": "1.0.0",
    "description": "<p>Get a list of roles the user has assigned.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles",
            "description": "<p>roles JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "roles.role",
            "description": "<p>role JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.name",
            "description": "<p>role name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.role.source",
            "description": "<p>role source, either &quot;assigned&quot; or the name of group who delegates the role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[[\"056af27f-b754-4287-aebe-129f5de8ab47\",\"Services\",\"assigned\"],[\"a08da95a-9c90-4dca-96db-0903cc8f82fa\",\"Labels\",\"admin\"],[\"7d307d71-1b89-45f7-a0be-3b0f0d1b2045\",\"Manifests\",\"admin\"]]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "GetAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/keycloak/users/:user/groups",
    "title": "Add User to Group",
    "version": "1.0.0",
    "description": "<p>Assign group membership to a user</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>group name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d '{\"id\":\"c8b87f1a-6f2f-4ae0-824d-1dda0ca7aaab\",\"name\":\"TeamA\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/groups\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "PostAppKeycloakUsersUserGroups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/keycloak/users/:user/roles",
    "title": "Add User Role",
    "version": "1.0.0",
    "description": "<p>Directly assign a role to specified user.</p>",
    "group": "Keycloak",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>input JSON</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.id",
            "description": "<p>role ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inputString.name",
            "description": "<p>role name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d '{\"id\":\"056af27f-b754-4287-aebe-129f5de8ab47\",\"name\":\"Services\"}'\nhttp://localhost:8080/StackV-web/restapi/app/keycloak/users/1d183570-2798-4d69-80c3-490f926596ff/roles\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Keycloak",
    "name": "PostAppKeycloakUsersUserRoles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/label/:username/clearall",
    "title": "Clear Labels",
    "version": "1.0.0",
    "description": "<p>Delete all labels owned by specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "DeleteAppLabelUsernameClearall",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/label/:username/delete/:identifier",
    "title": "Delete Label",
    "version": "1.0.0",
    "description": "<p>Delete identified label owned by specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>label ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "DeleteAppLabelUsernameDeleteIdentifier",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/label/:user",
    "title": "",
    "version": "1.0.0",
    "description": "<p>Get a list of labels belonging to the specified user.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "GetAppLabelUser",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/label",
    "title": "Add Label",
    "version": "1.0.0",
    "description": "<p>Add a new label.</p>",
    "group": "Labels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>TODO - Add Parameter Structure</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Labels",
    "name": "PutAppLabel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/logging/",
    "title": "Get Logging",
    "version": "1.0.0",
    "description": "<p>Get system logging level.</p>",
    "group": "Logging",
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/ -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>logging level</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "info",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "GetAppLogging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/logging/logs/:refUUID",
    "title": "Get Logs",
    "version": "1.0.0",
    "description": "<p>Get logs associated with an instance.</p>",
    "group": "Logging",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refUUID",
            "description": "<p>service instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/logs/e4d3bfd6-c269-4063-b02b-44aaef71d5b6 -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONArray",
            "optional": false,
            "field": "logs",
            "description": "<p>logs JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "JSONObject",
            "optional": false,
            "field": "logs.log",
            "description": "<p>log JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.marker",
            "description": "<p>log marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.timestamp",
            "description": "<p>log timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.level",
            "description": "<p>log level</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.logger",
            "description": "<p>log source</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.message",
            "description": "<p>log message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logs.log.exception",
            "description": "<p>log exception</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "[\n{\n\"exception\": \"\",\n\"level\": \"INFO\",\n\"marker\": \"\",\n\"logger\": \"net.maxgigapop.mrs.rest.api.WebResource\",\n\"message\": \"Initialized.\",\n\"timestamp\": \"2017-03-17 12:23:16.0\"\n},\n...]",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "GetAppLoggingLogsRefuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/logging/:level",
    "title": "Set Logging",
    "version": "1.0.0",
    "description": "<p>Set system logging level.</p>",
    "group": "Logging",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>logging level, one of the following: TRACE, DEBUG, INFO, WARN, ERROR</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -k -v http://127.0.0.1:8080/StackV-web/restapi/app/logging/trace -H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Logging",
    "name": "PutAppLoggingLevel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/manifest/:svcUUID",
    "title": "Get Manifest",
    "version": "1.0.0",
    "description": "<p>Get manifest for specified service instance.</p>",
    "group": "Manifests",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "svcUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "TODO - Add Example Call",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Object",
            "description": "<p>return TODO - Add Return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "TODO - Add Example Response",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Manifests",
    "name": "GetAppManifestSvcuuid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/app/profile/:wizardID",
    "title": "Delete Profile",
    "version": "1.0.0",
    "description": "<p>Delete specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X DELETE http://localhost:8080/StackV-web/restapi/app/profile/11\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "DeleteAppProfileWizardid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/profile/:wizardID",
    "title": "Get Profile",
    "version": "1.0.0",
    "description": "<p>Get specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/profile/11\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSONObject",
            "optional": false,
            "field": "wizard_json",
            "description": "<p>Profile JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "{\"username\": \"admin\",\"type\": \"netcreate\",\"alias\": \"VCN.OPS.1VM_Ext.233\",\"data\": {\"virtual_clouds\": []}}",
          "type": "json"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "GetAppProfileWizardid",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/profile/new",
    "title": "Add New Profile",
    "version": "1.0.0",
    "description": "<p>Save a new wizard profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>Profile JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -d @newprofile.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/profile/11/edit\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "PutAppProfileNew",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/profile/:wizardID/edit",
    "title": "Modify Profile",
    "version": "1.0.0",
    "description": "<p>Modify the specified profile.</p>",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wizardID",
            "description": "<p>wizard ID</p>"
          },
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>Profile JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT -d @newprofile.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/profile/11/edit\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Profile",
    "name": "PutAppProfileWizardidEdit",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/service/:siUUID/status",
    "title": "Check Status",
    "version": "1.0.0",
    "description": "<p>Retrieve full status of specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/status\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Instance status composite, containing both superstate and substate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "Cancel - FAILED",
          "type": "String"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "GetAppServiceSiuuidStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/app/service/:siUUID/substatus",
    "title": "Check Substatus",
    "version": "1.0.0",
    "description": "<p>Retrieve substatus of specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/substatus\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Instance substatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "FAILED",
          "type": "String"
        }
      ]
    },
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "GetAppServiceSiuuidSubstatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/app/service",
    "title": "Create Service",
    "version": "1.0.0",
    "description": "<p>Create new service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSONObject",
            "optional": false,
            "field": "inputString",
            "description": "<p>service JSON</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X POST -d @newservice.json -H \"Content-Type: application/json\"\nhttp://localhost:8080/StackV-web/restapi/app/service\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "PostAppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/app/service/:siUUID/:action",
    "title": "Operate Service",
    "version": "1.0.0",
    "description": "<p>Operate on the specified service instance.</p>",
    "group": "Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "siUUID",
            "description": "<p>instance UUID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>operation to execute</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Call:",
        "content": "curl -X PUT http://localhost:8080/StackV-web/restapi/app/service/49f3d197-de3e-464c-aaa8-d3fe5f14af0b/cancel\n-H \"Authorization: bearer $KC_ACCESS_TOKEN\"",
        "type": "curl"
      }
    ],
    "filename": "/Users/rikenavadur/NetBeansProjects/Feature/StackV/StackV-web/src/main/java/net/maxgigapop/mrs/rest/api/WebResource.java",
    "groupTitle": "Service",
    "name": "PutAppServiceSiuuidAction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "defaultValue": "Authorization: bearer $KC_ACCESS_TOKEN",
            "description": "<p>Keycloak authorization token header.</p>"
          }
        ]
      }
    }
  }
] });