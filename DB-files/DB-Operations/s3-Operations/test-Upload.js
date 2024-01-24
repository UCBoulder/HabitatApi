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
const region = "us-east-1";
const client = new client_s3_1.S3Client({ region });
const s3Upload_1 = require("./s3Upload");
function processFile(encodedFileString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chunks = yield (0, turn_file_multi_1.splitFileToChunks)(encodedFileString);
            const chunkBuffers = Buffer.concat(chunks);
            const location = yield (0, s3Upload_1.s3MultipartUpload)("test-cow", "test-photos/test-Photo.jpeg", chunkBuffers);
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
