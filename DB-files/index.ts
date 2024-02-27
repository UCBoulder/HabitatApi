import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

export const client = new DynamoDBClient({

  region: "us-east-1", // For local DynamoDB, the region doesn't matter
});



// dotenv.config();
// export const s3Client = new S3Client({
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
//   endpoint: process.env.CUSTOM_S3_ENDPOINT
// });

