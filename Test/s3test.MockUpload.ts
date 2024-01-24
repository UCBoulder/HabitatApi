import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const region = "us-east-1";
const client = new S3Client({ region});
export const customUpload = async (bucket: string, key: string, file: Buffer) => {
    const upload = new Upload({
      client: new S3Client({ region: 'us-east-1' }),
      params: { Bucket: bucket, Key: key, Body: file },
    });
  
    return upload.done();
  }
  