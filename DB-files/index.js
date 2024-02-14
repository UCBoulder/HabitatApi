"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
exports.client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1", // For local DynamoDB, the region doesn't matter
});
