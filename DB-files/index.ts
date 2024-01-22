import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-west-2", // For local DynamoDB, the region doesn't matter
});
