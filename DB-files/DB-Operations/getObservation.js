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
exports.getObservation = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../index.js");
const getObservation = (userID, observationID) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Observations",
        Key: {
            "userID": { S: userID },
            "ObservationID": { S: observationID },
        },
    };
    const command = new client_dynamodb_1.GetItemCommand(params);
    try {
        const result = yield index_js_1.client.send(command);
        if (result.Item) {
            console.log("Item retrieved:", result.Item);
            return result.Item;
        }
    }
    catch (error) {
        console.error("Error getting the item:", error);
        throw error;
    }
});
exports.getObservation = getObservation;
