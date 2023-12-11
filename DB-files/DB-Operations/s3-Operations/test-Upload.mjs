import {listBucketsCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import stream from 'stream';
import util from 'util';

const finished = util.promisify(stream.finished);

const s3 = new AWS.S3();

async function startUpload(file) {
  const params = {
    Bucket: 'bucket-name',
    Key: file.name,
  };

  const multipartUpload = await s3.createMultipartUpload(params).promise();

  console.log('Multipart upload started', multipartUpload.UploadId);

  // Split the file into parts, upload each part, and keep track of the ETags and part numbers
  const parts = [];
  const partSize = 5 * 1024 * 1024; // Minimum part size is 5mb
  let partNum = 0;

  for (let start = 0; start < file.data.length; start += partSize) {
    partNum++;
    
    const end = Math.min(start + partSize, file.data.length);
    const partData = file.data.slice(start, end);

    const uploadParams = {
      Body: partData,
      Bucket: params.Bucket,
      Key: params.Key,
      PartNumber: partNum,
      UploadId: multipartUpload.UploadId,
    };
    
    const uploadPart = await s3.uploadPart(uploadParams).promise();
    parts.push({
      ETag: uploadPart.ETag,
      PartNumber: partNum,
    });

    console.log(`Uploaded part ${partNum}`);
  }

  await completeUpload(multipartUpload.UploadId, params.Key, params.Bucket, parts);
}

async function completeUpload(uploadId, fileName, bucketName, parts) {

    const params = {
      Bucket: bucketName,
      Key: fileName,
      MultipartUpload: {
        Parts: parts,
      },
      UploadId: uploadId,
    };

  try {
    const data = await s3.completeMultipartUpload(params).promise();
    console.log('Upload Complete', data.Location);
  } catch (error) {
    console.error("Error while completing upload", error);
  }
}

// Usage example with a local file
const file = fs.readFileSync("DB-files/DB-Operations/s3-Operations/test-Photo.jpeg");

startUpload({ name: "file.jpg", data: file });
