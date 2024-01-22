import {GetObjectCommand} from '@aws-sdk/client-s3';
import { S3Client } from "@aws-sdk/client-s3";
const region = "us-east-1";
const client = new S3Client({ region});

async function s3GetObject(bucket: string, key: string) {
    const params = {
        Bucket: "test-cow",//this is the default bucket
        Key: key
    };

    try {
        const data = await client.send(new GetObjectCommand(params));
        return data.Body; // this will be a readable stream
    } catch (error) {
        console.error("Error getting object from S3:", error);
        return undefined;
    }
}

