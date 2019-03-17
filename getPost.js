var AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({profile: 'test_dynamodb_post_read'});

AWS.config.credentials = credentials;
AWS.config.endpoint = "https://dynamodb.us-east-1.amazonaws.com";
AWS.config.region = "us-east-1";

var docClient = new AWS.DynamoDB.DocumentClient();
//docClient.credentials = credentials;

console.log("Querying for Posts where PostID = 1");

var params = {
    TableName : "Posts",
    KeyConditionExpression: "PostID = :ID",
    ExpressionAttributeValues: {
        ":ID": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.PostID + ": " + item.PostName);
        });
    }
});
