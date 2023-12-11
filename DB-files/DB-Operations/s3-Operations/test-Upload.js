import AWS from 'aws-sdk';
const s3 = new AWS.S3();

const startUpload = async (file) => {
  const params = {
    Bucket: 'bucket-name',
    Key: file.name,
    Body: file,
  };
  try {
    const res = await s3.createMultipartUpload(params).promise();
    console.log('Upload ID', res.UploadId);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

const completeUpload = async (uploadID, parts) =>{
    const params = {
        Bucket: 'bucket-name',
        Key: 'file-name',
        MultipartUpload: {
            Parts: parts
        },
        UploadId: uploadID
    };
    try {
        const res = await s3.completeMultipartUpload(params).promise();
        console.log('Upload Completed, location: ', res.Location);  
    } catch (err) {
        console.log(err);
    }
}


