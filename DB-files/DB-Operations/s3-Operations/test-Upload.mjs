import { splitFileToChunks } from './turn-file_multi.mjs';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const region = "us-east-1";
const client = new S3Client({ region});

async function s3MultipartUpload(bucket, key, file) {
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
      return `https://${bucket}.s3.${region}.amazonaws.com/${key}`; // return the location of the file
  } catch (e) {
      console.error("Upload failed", e);
      return null;
  }
}

export async function processFile(encodedFileString) {
  try {
      const chunks = await splitFileToChunks(encodedFileString);
      const chunkBuffers = Buffer.concat(chunks);
      const location = await s3MultipartUpload("test-cow", "test-photos/test-Photo.jpeg", chunkBuffers);
      console.log(location);// For testing
      return location;
  } catch (err) {
      console.error(err);
      return null;
  }
}

export{
  processFile,
  
}