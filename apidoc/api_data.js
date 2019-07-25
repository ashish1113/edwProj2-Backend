define({ "api": [
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/view/comment",
    "title": "to view comments of an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Commented created&saved successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"commentId\": \"q-_9bfJ4N\",\n                \"relatedIssuesId\": \"hdxVRXUpB\",\n                \"comment\": \"new comment\",\n                \"commenter\": \"raj singh\",\n                \"commenterEmailId\": \"raj@gmail.com\",\n                \"createdOn\": \"2019-07-25T07:38:18.000Z\",\n                \"_id\": \"5d395c6abf182d249c3eb58e\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "comment",
    "name": "GetApiV1UsersIssueidViewComment"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create/comment",
    "title": "to comment on an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of an issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>comment on an issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commenter",
            "description": "<p>commenter of an issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commenterEmail",
            "description": "<p>commenterEmail of an issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Commented created&saved successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"commentId\": \"q-_9bfJ4N\",\n                \"relatedIssuesId\": \"hdxVRXUpB\",\n                \"comment\": \"new comment\",\n                \"commenter\": \"raj singh\",\n                \"commenterEmailId\": \"raj@gmail.com\",\n                \"createdOn\": \"2019-07-25T07:38:18.000Z\",\n                \"_id\": \"5d395c6abf182d249c3eb58e\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "comment",
    "name": "PostApiV1UsersCreateComment"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/get/allIssues",
    "title": "to get all issues on the system.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All issue details found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"m-H5f2S8Z\",\n                    \"title\": \"test title1\",\n                    \"description\": \"<p>asdfgh</p>\",\n                    \"screenshotName\": \"1563908630599_test1.png\",\n                    \"screenshotPath\": \"uploads/1563908630599_test1.png\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"In-BackLog\",\n                    \"creationDate\": \"2019-07-23T19:03:50.000Z\",\n                    \"lastestModificationDate\": \"2019-07-23T19:03:50.000Z\"\n                },\n                {\n                    \"issueId\": \"GMZZzdrGP\",\n                    \"title\": \"tttle\",\n                    \"description\": \"<p>sdgh</p>\",\n                    \"screenshotName\": \"1563882115633_test1.png\",\n                    \"screenshotPath\": \"uploads/1563882115633_test1.png\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"Done\",\n                    \"creationDate\": \"2019-07-23T11:41:56.000Z\",\n                    \"lastestModificationDate\": \"2019-07-23T11:41:56.000Z\"\n                },\n                {\n                    \"issueId\": \"VLbHBQHNK\",\n                    \"title\": \"totle\",\n                    \"description\": \"<p>sdfghj</p>\",\n                    \"screenshotName\": \"1563733678893_test1.png\",\n                    \"screenshotPath\": \"uploads/1563733678893_test1.png\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bobsimpson\",\n                    \"status\": \"In-BackLog\",\n                    \"creationDate\": \"2019-07-21T18:27:59.000Z\",\n                    \"lastestModificationDate\": \"2019-07-21T18:27:59.000Z\"\n                },\n                {\n                    \"issueId\": \"kzDinp_ij\",\n                    \"title\": \"title23\",\n                    \"description\": \"<p>sdfgh</p>\",\n                    \"screenshotName\": \"1563733606176_test1.png\",\n                    \"screenshotPath\": \"uploads/1563733606176_test1.png\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bobsimpson\",\n                    \"status\": \"In-BackLog\",\n                    \"creationDate\": \"2019-07-21T18:26:47.000Z\",\n                    \"lastestModificationDate\": \"2019-07-21T18:26:47.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersGetAllissues"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/issueDetails/:issueId",
    "title": "to get issue details of an issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of an issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue details found\",\n            \"status\": 200,\n            \"data\": {\n                \"issueId\": \"kzDinp_ij\",\n                \"title\": \"title23\",\n                \"description\": \"<p>sdfgh</p>\",\n                \"screenshotName\": \"1563733606176_test1.png\",\n                \"screenshotPath\": \"uploads/1563733606176_test1.png\",\n                \"reporterEmail\": \"bob@gmail.com\",\n                \"assigneeEmail\": \"bob@gmail.com\",\n                \"reporterName\": \"bob simpson\",\n                \"assigneeName\": \"bobsimpson\",\n                \"status\": \"In-BackLog\",\n                \"creationDate\": \"2019-07-21T18:26:47.000Z\",\n                \"lastestModificationDate\": \"2019-07-21T18:26:47.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersIssuedetailsIssueid"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/userIssues/:email",
    "title": "to get issues assigned to the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issues  Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"yt32hbFDs\",\n                    \"title\": \"test 1234huhifh\",\n                    \"description\": \"<p>dvfbh gj</p>\",\n                    \"screenshotName\": \"1563965971627_Screenshot from 2019-05-14 16-27-32.png\",\n                    \"screenshotPath\": \"uploads/1563965971627_Screenshot from 2019-05-14 16-27-32.png\",\n                    \"reporterEmail\": \"raj@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"raj singh\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"In-BackLog\",\n                    \"creationDate\": \"2019-07-24T10:59:31.000Z\",\n                    \"lastestModificationDate\": \"2019-07-24T10:59:31.000Z\"\n                },\n                {\n                    \"issueId\": \"m-H5f2S8Z\",\n                    \"title\": \"test title1\",\n                    \"description\": \"<p>asdfgh</p>\",\n                    \"screenshotName\": \"1563908630599_test1.png\",\n                    \"screenshotPath\": \"uploads/1563908630599_test1.png\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"In-BackLog\",\n                    \"creationDate\": \"2019-07-23T19:03:50.000Z\",\n                    \"lastestModificationDate\": \"2019-07-23T19:03:50.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersUserissuesEmail"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create/issue",
    "title": "to create new issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterName",
            "description": "<p>reporterName of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterEmail",
            "description": "<p>reporterEmail of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeName",
            "description": "<p>assigneeName of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeEmail",
            "description": "<p>assigneeEmail of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "image",
            "description": "<p>image of the issue. (body params(form-data)) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"new issue created successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"issueId\": \"ODpTmDswx\",\n                \"title\": \"test tiltle again1234\",\n                \"description\": \"test description 234542\",\n                \"screenshotName\": \"1564038290816_Screenshot from 2019-05-14 16-27-32.png\",\n                \"screenshotPath\": \"uploads/1564038290816_Screenshot from 2019-05-14 16-27-32.png\",\n                \"_id\": \"5d395492bf182d249c3eb58a\",\n                \"reporterEmail\": \"bob@gmail.com\",\n                \"assigneeEmail\": \"raj@gmail.com\",\n                \"reporterName\": \"bobSimson\",\n                \"assigneeName\": \"raj\",\n                \"status\": \"done1\",\n                \"creationDate\": \"2019-07-25T07:04:50.000Z\",\n                \"lastestModificationDate\": \"2019-07-25T07:04:50.000Z\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PostApiV1UsersCreateIssue"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/editIssue/:issueId",
    "title": "to edit an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue details edited\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PutApiV1UsersEditissueIssueid"
  },
  {
    "group": "notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/mark/notification/seen",
    "title": "to mark notification as seen.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notificationId",
            "description": "<p>notificationId of the user. (Send notificationId as query parameter) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Marked As Seen\",\n            \"status\": 200,\n            \"data\": {\n                \"notificationId\": \"Wg5imZG9EK\",\n                \"notificationStatus\": \"un-seen\",\n                \"userEmailToSendNotification\": \"bob@gmail.com\",\n                \"_id\": \"5d396823bf182d249c3eb594\",\n                \"notificationIssueData\": {\n                    \"issueId\": \"-UWgkhajG\",\n                    \"title\": \"test 3\",\n                    \"description\": \"test description 234542\",\n                    \"screenshotName\": \"1564043299230_jeep_n.jpg\",\n                    \"screenshotPath\": \"uploads/1564043299230_jeep_n.jpg\",\n                    \"_id\": \"5d396823bf182d249c3eb593\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bobSimson\",\n                    \"assigneeName\": \"bob\",\n                    \"status\": \"done1\",\n                    \"creationDate\": \"2019-07-25T08:28:19.000Z\",\n                    \"lastestModificationDate\": \"2019-07-25T08:28:19.000Z\",\n                    \"__v\": 0\n                },\n                \"notificationMessage\": \"hey a new issue is created with IssueId-UWgkhajG by bobSimson\",\n                \"notificationPurpose\": \"create\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "notification",
    "name": "GetApiV1UsersMarkNotificationSeen"
  },
  {
    "group": "searchIssue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/issue/:text/search",
    "title": "to search for issues for the give text .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>text for search. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"issues present by this search text\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"GMZZzdrGP\",\n                    \"title\": \"tttle\",\n                    \"description\": \"<p>sdgh</p>\",\n                    \"screenshotName\": \"1563882115633_test1.png\",\n                    \"screenshotPath\": \"uploads/1563882115633_test1.png\",\n                    \"_id\": \"5d36f284d5e6ae4f77d58057\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"Done\",\n                    \"creationDate\": \"2019-07-23T11:41:56.000Z\",\n                    \"lastestModificationDate\": \"2019-07-23T11:41:56.000Z\",\n                    \"__v\": 0\n                },\n                {\n                    \"issueId\": \"hEME6iNP8\",\n                    \"title\": \"title 31\",\n                    \"description\": \"<p>dfghdhgj</p>\",\n                    \"screenshotName\": \"1563731840433_test1.png\",\n                    \"screenshotPath\": \"uploads/1563731840433_test1.png\",\n                    \"_id\": \"5d34a7809308c919fad51cc1\",\n                    \"reporterEmail\": \"bob@gmail.com\",\n                    \"assigneeEmail\": \"bob@gmail.com\",\n                    \"reporterName\": \"bob simpson\",\n                    \"assigneeName\": \"bob simpson\",\n                    \"status\": \"Done\",\n                    \"creationDate\": \"2019-07-21T17:57:20.000Z\",\n                    \"lastestModificationDate\": \"2019-07-21T17:57:20.000Z\",\n                    \"__v\": 0\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "searchIssue",
    "name": "GetApiV1UsersIssueTextSearch"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/get/Details/full",
    "title": "to get user details via authToken.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n\n{\n            \"error\": false,\n            \"message\": \"get User Details\",\n            \"status\": 200,\n            \"data\": {\n                \"jwtid\": \"7Thif7kMp\",\n                \"iat\": 1564037969781,\n                \"exp\": 1564124369781,\n                \"sub\": \"authToken\",\n                \"iss\": \"ed-p1-IssueTrackerTool\",\n                \"data\": {\n                    \"userId\": \"sNazOuVLi\",\n                    \"firstName\": \"rickey\",\n                    \"lastName\": \"pointing\",\n                    \"userName\": \"rickey@gmail.com\",\n                    \"email\": \"rickey@gmail.com\",\n                    \"mobileNumber\": 9800978956,\n                    \"socialLoginFlag\": false,\n                    \"localLoginFlag\": true\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersGetDetailsFull"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "to get user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n\n{\n            \"error\": false,\n            \"message\": \" User Details Found\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"chofdY-cC\",\n                \"firstName\": \"bob\",\n                \"lastName\": \"simpson\",\n                \"userName\": \"bob@gmail.com\",\n                \"email\": \"bob@gmail.com\",\n                \"mobileNumber\": 9556788895,\n                \"socialLoginFlag\": false,\n                \"localLoginFlag\": true\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/allUsers",
    "title": "to get all users on the system.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedin user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \" user Found on system\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"vgia1t1JF\",\n                    \"firstName\": \"raj\",\n                    \"lastName\": \"singh\",\n                    \"userName\": \"raj@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"raj@gmail.com\",\n                    \"mobileNumber\": 980097895678,\n                    \"socialLoginFlag\": false,\n                    \"localLoginFlag\": true,\n                    \"_id\": \"5d231354a97bbc5efd7dc2c6\",\n                    \"__v\": 0\n                },\n                {\n                    \"userId\": \"chofdY-cC\",\n                    \"firstName\": \"bob\",\n                    \"lastName\": \"simpson\",\n                    \"userName\": \"bob@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"bob@gmail.com\",\n                    \"mobileNumber\": 9556788895,\n                    \"socialLoginFlag\": false,\n                    \"localLoginFlag\": true,\n                    \"_id\": \"5d2a394e267eeb715071c708\",\n                    \"__v\": 0\n                },\n                {\n                    \"userId\": \"sNazOuVLi\",\n                    \"firstName\": \"rickey\",\n                    \"lastName\": \"pointing\",\n                    \"userName\": \"rickey@gmail.com\",\n                    \"password\": \"4a73343e7ee24d83a3c4d6b53377d262\",\n                    \"email\": \"rickey@gmail.com\",\n                    \"mobileNumber\": 9800978956,\n                    \"socialLoginFlag\": false,\n                    \"localLoginFlag\": true,\n                    \"_id\": \"5d38a519bf182d249c3eb588\",\n                    \"__v\": 0\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAllusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlVPS2duMnVtNyIsImlhdCI6MTU2Mzk5MzYyNTg1MSwiZXhwIjoxNTY0MDgwMDI1ODUxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMS1Jc3N1ZVRyYWNrZXJUb29sIiwiZGF0YSI6eyJ1c2VySWQiOiJzTmF6T3VWTGkiLCJmaXJzdE5hbWUiOiJyaWNrZXkiLCJsYXN0TmFtZSI6InBvaW50aW5nIiwidXNlck5hbWUiOiJyaWNrZXlAZ21haWwuY29tIiwiZW1haWwiOiJyaWNrZXlAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5ODAwOTc4OTU2LCJzb2NpYWxMb2dpbkZsYWciOmZhbHNlLCJsb2NhbExvZ2luRmxhZyI6dHJ1ZX19.wnpJKu5unc-8l2JyLloJfggi5axij-f5Gee85HVlJr0\",\n        \"userDetails\": {\n            \"userId\": \"sNazOuVLi\",\n            \"firstName\": \"rickey\",\n            \"lastName\": \"pointing\",\n            \"userName\": \"rickey@gmail.com\",\n            \"email\": \"rickey@gmail.com\",\n            \"mobileNumber\": 9800978956,\n            \"socialLoginFlag\": false,\n            \"localLoginFlag\": true\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created or updated\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"sNazOuVLi\",\n        \"firstName\": \"rickey\",\n        \"lastName\": \"pointing\",\n        \"userName\": \"rickey@gmail.com\",\n        \"email\": \"rickey@gmail.com\",\n        \"mobileNumber\": 9800978956,\n        \"socialLoginFlag\": false,\n        \"localLoginFlag\": true,\n        \"_id\": \"5d38a519bf182d249c3eb588\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/get/watcherList",
    "title": "to get watcherList of an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All Watcher Found Successfully\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"watcherId\": \"cir-CpcA4\",\n                    \"issueId\": \"hdxVRXUpB\",\n                    \"watcherEmail\": \"raj@gmail.com\",\n                    \"createdOn\": \"2019-07-08T11:37:22.000Z\"\n                },\n                {\n                    \"watcherId\": \"t8mFdZJc0\",\n                    \"issueId\": \"hdxVRXUpB\",\n                    \"watcherEmail\": \"bob@gmail.com\",\n                    \"createdOn\": \"2019-07-25T08:08:49.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "watcher",
    "name": "GetApiV1UsersIssueidGetWatcherlist"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/add/as/watcher",
    "title": "to add as a watcher for an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherEmail",
            "description": "<p>watcherEmail of the user to add as watcher. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"watcher Added\",\n            \"status\": 200,\n            \"data\": {\n                \"watcherId\": \"t8mFdZJc0\",\n                \"issueId\": \"hdxVRXUpB\",\n                \"watcherEmail\": \"bob@gmail.com\",\n                \"createdOn\": \"2019-07-25T08:08:49.000Z\",\n                \"_id\": \"5d396391bf182d249c3eb592\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "watcher",
    "name": "PostApiV1UsersAddAsWatcher"
  }
] });
