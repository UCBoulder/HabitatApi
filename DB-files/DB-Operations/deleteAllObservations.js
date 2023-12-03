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
exports.deleteItemsWithZeroVerificationRating = void 0;
//function for deleting all entries that have a verificationRating of 0, if the entry has been verified as not cheatgrass
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const deleteItemsWithZeroVerificationRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = "Observations";
    const scanCommand = new lib_dynamodb_1.ScanCommand({
        TableName: tableName,
        FilterExpression: 'verificationRating = :rating',
        ExpressionAttributeValues: {
            ':rating': 0,
        },
    });
    try {
        const scanResponse = yield docClient.send(scanCommand);
        const itemsToDelete = scanResponse.Items;
        for (const item of itemsToDelete || []) {
            const deleteCommand = new lib_dynamodb_1.DeleteCommand({
                TableName: tableName,
                Key: {
                    ObservationID: item.ObservationID,
                },
            });
            yield docClient.send(deleteCommand);
        }
        console.log('Items deleted successfully:', itemsToDelete);
        return itemsToDelete;
    }
    catch (error) {
        console.error('Error deleting items:', error);
        throw error;
    }
});
exports.deleteItemsWithZeroVerificationRating = deleteItemsWithZeroVerificationRating;
