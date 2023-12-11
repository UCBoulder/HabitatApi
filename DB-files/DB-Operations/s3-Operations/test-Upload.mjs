import { splitFileToChunks } from './turn-file_multi.mjs';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({ region: "us-east-1" });

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
  } catch (e) {
      console.error("Upload failed", e);
  }
}

async function processFile() {
  try {
      const chunks = await splitFileToChunks("DB-files/DB-Operations/s3-Operations/test-Photo.jpeg");
      const chunkBuffers = Buffer.concat(chunks);
      await s3MultipartUpload("test-cow", "test-Photo.jpeg", chunkBuffers);
  } catch (err) {
      console.error(err);
  }
}

processFile();
