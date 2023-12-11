import { S3Client,PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from 'fs';
const client = new S3Client({region: 'us-east-1'});
export const helloS3 = async () => {
    const command = new ListBucketsCommand({});

    const { Buckets } = await client.send(command);
    console.log("Buckets: ");
    console.log(Buckets.map((bucket) => bucket.Name).join("\n"));
    return Buckets;
  };
  export const main = async () => {
    const command = new ListObjectsV2Command({
      Bucket: "test-cow",
      // The default and maximum number of keys returned is 1000. This limits it to
      // one for demonstration purposes.
      MaxKeys: 1,
    });
  
    try {
      let isTruncated = true;
  
      console.log("Your bucket contains the following objects:\n");
      let contents = "";
  
      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } =
          await client.send(command);
        const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
        contents += contentsList + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      console.log(contents);
    } catch (err) {
      console.error(err);
    }
  };
export const insertItem = async () => {
    const fileStream = fs.createReadStream('DB-files/DB-Operations/s3-Operations/test-Photo.jpeg');

    const command = new PutObjectCommand({
      Bucket: "test-cow",
      Key: "test.jpg",
      Body: fileStream,
    });
        try{
            const response = await client.send(command);
            console.log(response);
        }catch(err){
            console.error(err);
        }   
}

helloS3();
main();


  
  