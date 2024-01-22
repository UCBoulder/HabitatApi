import { splitFileToChunks } from "./turn-file_multi";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const region = "us-east-1";
const client = new S3Client({ region});

async function s3MultipartUpload(bucket: string, key: string, file: Buffer) {
  const upload = new Upload({
    client: client,
    params: {
        Bucket: bucket,
        Key: key,
        Body: file,
    },
  });

  try {
      await upload.done();
      console.log(`File uploaded successfully to ${bucket}/${key}`);
      // return `https://${bucket}.s3.${region}.amazonaws.com/${key}`; // return the location of the file
      //updated to only return the location of the photo. this way can use a more secured signed ULR to get the photo
      return key;
  } catch (e) {
      console.error("Upload failed", e);
      return undefined;
  }
}

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

