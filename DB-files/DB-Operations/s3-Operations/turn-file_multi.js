"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitFileToChunks = void 0;
function splitFileToChunks(encodedString, chunkSize = 1024 * 1024 * 5) {
    const fileBuffer = Buffer.from(encodedString, 'base64');
    const chunks = [];
    for (let i = 0; i < fileBuffer.length; i += chunkSize) {
        chunks.push(fileBuffer.slice(i, i + chunkSize));
    }
    return Promise.resolve(chunks);
}
exports.splitFileToChunks = splitFileToChunks;
