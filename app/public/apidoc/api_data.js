define({ "api": [  {    "type": "post",    "url": "/asset",    "title": "Rota para a criação de um ativo",    "name": "Cria__o",    "group": "Ativo",    "permission": [      {        "name": "admin"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>O token para validação do usuário</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "asset",            "description": "<p>O objeto ativo que deseja criar</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "asset.id",            "description": "<p>O id do ativo</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "asset.name",            "description": "<p>O nome do ativo</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "asset.type",            "description": "<p>O tipo do ativo</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "asset.descripton",            "description": "<p>A descrição do ativo</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "asset.local",            "description": "<p>O local que o ativo está localizado no momento</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "1",            "description": "<p>Ocorreu um erro no banco de dados</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "7",            "description": "<p>O id do ativo já existe</p>"          }        ]      },      "examples": [        {          "title": "Error-Response 1:",          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errorCode\": \"1\"\n}",          "type": "json"        },        {          "title": "Error-Response 2:",          "content": "HTTP/1.1 403 Forbidden\n{\n    \"errorCode\": \"7\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/route/asset.js",    "groupTitle": "Ativo"  },  {    "type": "get",    "url": "/asset",    "title": "Rota que retorna uma lista com todos os ativos disponíveis",    "name": "Leitura",    "group": "Ativo",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>O token para validação do usuário</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "assets",            "description": "<p>Uma lista de ativos</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "assets.id",            "description": "<p>O id de um ativo</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "assets.name",            "description": "<p>O nome de um ativo</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "assets.type",            "description": "<p>O tipo do ativo</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "assets.description",            "description": "<p>A descrição do ativo</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "assets.local",            "description": "<p>O local que o ativo está localizado no momento</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 Ok\n {\n     \"assets\": [\n         {\n             \"id\": \"3005fb63ac1f3681ec880468\",\n             \"name\": \"asset name\",\n             \"type\": \"asset_type\",\n             \"description\": \"asset description\",\n             \"local\": \"asset_local\"\n         }\n     ]\n }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "1",            "description": "<p>Ocorreu um erro no banco de dados</p>"          }        ]      },      "examples": [        {          "title": "Error-Response 1:",          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errorCode\": \"1\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/route/asset.js",    "groupTitle": "Ativo"  },  {    "type": "post",    "url": "/listener",    "title": "Rota para a criação de um listener",    "name": "Cria__o",    "group": "Listener",    "permission": [      {        "name": "admin"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>O token para validação do usuário</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "idLocal",            "description": "<p>O id do local cujo usuário quer monitorar</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "1",            "description": "<p>Ocorreu um erro no banco de dados</p>"          }        ]      },      "examples": [        {          "title": "Error-Response 1:",          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errorCode\": \"1\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/route/listener.js",    "groupTitle": "Listener"  }] });
