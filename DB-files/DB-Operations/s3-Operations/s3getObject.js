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
exports.s3GetPhoto_SignedURL = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const region = "us-east-1";
const client = new client_s3_1.S3Client({ region });
// async function s3GetPhoto_SignedURL(bucket: string, key: string) {
function s3GetPhoto_SignedURL(key) {
    return __awaiter(this, void 0, void 0, function* () {
        //create the commadn to get the object
        const command = new client_s3_1.GetObjectCommand({
            Bucket: "test-cow",
            Key: key,
        });
        try {
            //create a signed URL to get the object, only valid for a short amount of time
            return yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 60 * 60 * 2 }); //2 hours
        }
        catch (error) {
            console.error("Error getting object from S3:", error);
            return undefined;
        }
    });
}
exports.s3GetPhoto_SignedURL = s3GetPhoto_SignedURL;
// import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
// const region = "us-east-1";
// const client = new S3Client({ 
//         region,
//         credentials: {
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//         },
//         endpoint: process.env.CUSTOM_S3_ENDPOINT
//     });
// export async function s3GetPhoto_SignedURL(key: string) {
//     //create the command to get the object
//     const command = new GetObjectCommand({
//         Bucket: "test-cow",
//         Key: key,
//     });
//     try {
//         //create a signed URL to get the object, only valid for a short amount of time
//         return await getSignedUrl(client, command, { expiresIn: 60*60*2});//2 hours
//     } catch (error) {
//         console.error("Error getting object from S3:", error);
//         return undefined;
//     }
// } 
