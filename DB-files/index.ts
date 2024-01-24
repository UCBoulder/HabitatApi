import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  endpoint: "vpce-0ba7e37aebef6a5a2",
  region: "us-east", // For local DynamoDB, the region doesn't matter
});
