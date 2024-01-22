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
exports.main = void 0;
//function for if verifier decides to delete an entries manually using observation ID
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const main = (ObservationIDToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = "Observations";
    const command = new lib_dynamodb_1.DeleteCommand({
        TableName: tableName,
        Key: {
            ObservationID: "observationIDToDelete",
        },
    });
    try {
        const response = yield docClient.send(command);
        console.log("Item deleted successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error deleting item:", error);
        throw error; // Rethrow the error to indicate failure
    }
});
exports.main = main;
