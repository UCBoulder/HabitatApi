"use strict";
exports.__esModule = true;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
exports.client = new client_dynamodb_1.DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-west-2"
});
