import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = "us-east-1";
const client = new S3Client({ region});

// async function s3GetPhoto_SignedURL(bucket: string, key: string) {
export async function s3GetPhoto_SignedURL(key: string) {
    //create the commadn to get the object
    const command = new GetObjectCommand({
        Bucket: "test-cow",
        Key: key,
    });

    try {
        //create a signed URL to get the object, only valid for a short amount of time
        return await getSignedUrl(client, command, { expiresIn: 60*60*2});//2 hours

    } catch (error) {
        console.error("Error getting object from S3:", error);
        return undefined;
    }
}
