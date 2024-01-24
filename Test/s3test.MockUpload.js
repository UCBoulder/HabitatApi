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
exports.customUpload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const region = "us-east-1";
const client = new client_s3_1.S3Client({ region });
const customUpload = (bucket, key, file) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = new lib_storage_1.Upload({
        client: new client_s3_1.S3Client({ region: 'us-east-1' }),
        params: { Bucket: bucket, Key: key, Body: file },
    });
    return upload.done();
});
exports.customUpload = customUpload;
