import fs from 'fs';

export function splitFileToChunks(fileLocation, chunkSize = 1024 * 1024 * 5) { // default size of each chunk is 5MB
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fileLocation, { highWaterMark: chunkSize }); // create a read stream with chunk size
    const chunks = [];

    fileStream.on('data', (chunk) => {
      chunks.push(chunk); // push each chunk to the array
    });

    fileStream.on('end', () => {
      resolve(chunks); // resolve the promise with the array of chunks when end of file is reached
    });

    fileStream.on('error', reject); // in case of an error reading the file, reject the promise
  });
}

async function processFile() {
  try {
    const chunks = await splitFileToChunks("DB-files/DB-Operations/s3-Operations/test-Photo.jpeg");
    console.log(chunks); // here chunks is an array of Buffer, each Buffer represents a part of the file
  } catch (err) {
    console.error(err);
  }
}

processFile();
