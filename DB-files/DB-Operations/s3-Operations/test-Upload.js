"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFile = void 0;
const turn_file_multi_1 = require("./turn-file_multi");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const region = "us-east-1";
const client = new client_s3_1.S3Client({ region });
function s3MultipartUpload(bucket, key, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const upload = new lib_storage_1.Upload({
            client: client,
            params: {
                Bucket: bucket,
                Key: key,
                Body: file,
            },
        });
        try {
            yield upload.done();
            console.log(`File uploaded successfully to ${bucket}/${key}`);
            // return `https://${bucket}.s3.${region}.amazonaws.com/${key}`; // return the location of the file
            //updated to only return the location of the photo. this way can use a more secured signed ULR to get the photo
            return key;
        }
        catch (e) {
            console.error("Upload failed", e);
            return undefined;
        }
    });
}
function processFile(encodedFileString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chunks = yield (0, turn_file_multi_1.splitFileToChunks)(encodedFileString);
            const chunkBuffers = Buffer.concat(chunks);
            const location = yield s3MultipartUpload("test-cow", "test-photos/test-Photo.jpeg", chunkBuffers);
            console.log(location); // For testing
            return location;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    });
}
exports.processFile = processFile;
