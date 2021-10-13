define({ "api": [
  {
    "type": "post",
    "url": "/auht/register",
    "title": "Create user",
    "name": "Create_user",
    "group": "Authenfication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>firstname of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>lastname of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date_naissance",
            "description": "<p>date de naissance of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sexe",
            "description": "<p>sexe of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message confirmant l'opération</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "tokens",
            "description": "<p>tokens</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"L'utulistauer a bien été créé avec succès\",\n  \"tokens\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvemV6emR6bGxhbmR6QGdtYWlsLmNvbSIsImlkIjozMCwiaWF0IjoxNjM0MDQ0MTk3LCJleHAiOjE2MzQwNTEzOTd9.wkzOQ524QDj9YE7iHH1h4r38B0Qk0tZXfQ95e-mo9cA\",\n    \"refresh_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvemV6emR6bGxhbmR6QGdtYWlsLmNvbSIsImlkIjozMCwiaWF0IjoxNjM0MDQ0MTk3LCJleHAiOjE2MzQ2NDg5OTd9.rROZwHPCm5MUV4Jn03ZboXDaGwwgOfONd2ZnzPYXXPM\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Authenfication"
  },
  {
    "type": "post",
    "url": "/auht/login",
    "title": "Login",
    "name": "Login",
    "group": "Authenfication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "authentication",
            "description": "<p>successful</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"error\": false,\n\"message\": \"L'utulistauer a  été authentifié  succès\",\n\"tokens\": {\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTYzNDEwNzQ2MCwiZXhwIjoxNjM0MTE0NjYwfQ.aGe5ZSayVvMchH95tY9NthbSb0TYmCaU9juWajAuBHs\",\n  \"refresh_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTYzNDEwNzQ2MCwiZXhwIjoxNjM0NzEyMjYwfQ.-dgt8yOQQSODplbDJmLKQYdiNTNAsjiVPIePFbqmAEA\",\n  \"createdAt\": \"2021-10-11T21:00:00.000Z\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Authenfication"
  },
  {
    "type": "get",
    "url": "/token/refreshTokens",
    "title": "refreshTokens",
    "name": "refreshTokens",
    "group": "Refresh_Tokens",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "modification",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n \"error\": false,\n\"message\": \"L'utilisateur a été modifiée succès\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/refreshTokens.ts",
    "groupTitle": "Refresh_Tokens"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "get one user",
    "name": "Get_one_user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the user.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>one user succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"firstname\": \"rolland\",\n    \"lastname\": \"SAF\",\n    \"email\": \"rea@gmail.com\",\n     \"date_naissance\": \"2020-12-03T21:00:00.000Z\",\n     \"sexe\": \"male\",\n    \"createdAt\": \"2021-10-11T21:00:00.000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "get all user",
    "name": "get_all_user",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "modification",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n \"error\": false,\n\"message\": \"L'utilisateur a été modifiée succès\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/changePassword/:id",
    "title": "update password",
    "name": "get_update_password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currenPassword",
            "description": "<p>currenPassword of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>newPassword of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>confirmPassword of the user.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "modification",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n \"error\": false,\n \"message\": \"Le mot de passe a été modifiée succès\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/auht/user",
    "title": "disconnection",
    "name": "logout",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "modification",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"error\": false,\n\"message\": \"L'utilisateur a été déconnecté succès\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/",
    "title": "index page",
    "name": "index_page",
    "group": "Users",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "send",
            "description": "<p>page index</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "send",
            "description": "<p>page index 404</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "update an user",
    "name": "update_an_user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>firstname of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>lastname of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date_naissance",
            "description": "<p>date de naissance of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sexe",
            "description": "<p>sexe of user</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "modification",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n \"error\": false,\n\"message\": \"L'utilisateur a été modifiée succès\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "User"
  }
] });
