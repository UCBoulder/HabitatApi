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
exports.batchUploadItems = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../index.js");
const batchUploadItems = (observations) => __awaiter(void 0, void 0, void 0, function* () {
    const putRequests = observations.map((observation) => ({
        PutRequest: {
            Item: observation,
        },
    }));
    const batchSize = 25; // Specify the desired batch size, max 25
    const batchPromises = [];
    for (let i = 0; i < putRequests.length; i += batchSize) {
        const batchWriteInput = {
            RequestItems: {
                "Observations": putRequests.slice(i, i + batchSize),
            },
        };
        const command = new client_dynamodb_1.BatchWriteItemCommand(batchWriteInput);
        const promise = index_js_1.client.send(command);
        batchPromises.push(promise);
    }
    try {
        const batchResults = yield Promise.all(batchPromises);
        console.log("Batch upload successful:", batchResults);
        return batchResults;
    }
    catch (error) {
        console.error("Error performing batch upload:", error);
        throw error;
    }
});
exports.batchUploadItems = batchUploadItems;
