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
exports.createTable = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../index.js");
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_dynamodb_1.CreateTableCommand({
        TableName: "Observations",
        AttributeDefinitions: [
            {
                AttributeName: "UserID",
                AttributeType: "S",
            },
            {
                AttributeName: "ObservationID",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "UserID",
                KeyType: "HASH", // Partition Key
            },
            {
                AttributeName: "ObservationID",
                KeyType: "RANGE", // Sort Key
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    });
    try {
        const response = yield index_js_1.client.send(command);
        console.log("Table created successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error creating table:", error);
        throw error;
    }
});
exports.createTable = createTable;
