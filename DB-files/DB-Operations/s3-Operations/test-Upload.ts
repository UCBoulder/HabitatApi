import { splitFileToChunks } from "./turn-file_multi";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const region = "us-east-1";
const client = new S3Client({ region});
import { s3MultipartUpload } from "./s3Upload";

export async function processFile(encodedFileString: string) {
  try {
      const chunks = await splitFileToChunks(encodedFileString);
      const chunkBuffers = Buffer.concat(chunks);
      const location = await s3MultipartUpload("test-cow", "test-photos/test-Photo.jpeg", chunkBuffers);
      console.log(location);// For testing
      return location;
  } catch (err) {
      console.error(err);
      return undefined;
  }
}

