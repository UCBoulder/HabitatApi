export function splitFileToChunks(encodedString, chunkSize = 1024 * 1024 * 5) { // default size of each chunk is 5MB
    const fileBuffer = Buffer.from(decodedString, 'base64');
    const chunks = [];
  
    for (let i = 0; i < fileBuffer.length; i += chunkSize) {
        chunks.push(fileBuffer.slice(i, i + chunkSize));
    }
  
    return Promise.resolve(chunks);
  }
  
