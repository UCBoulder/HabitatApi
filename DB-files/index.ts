import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({

  region: "us-east-1", // For local DynamoDB, the region doesn't matter
});

