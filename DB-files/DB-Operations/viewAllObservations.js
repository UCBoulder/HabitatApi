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
exports.viewAllObservations = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../index.js");
const viewAllObservations = () => __awaiter(void 0, void 0, void 0, function* () {
    const scanInput = {
        TableName: "Observations",
    };
    const command = new client_dynamodb_1.ScanCommand(scanInput);
    try {
        const results = yield index_js_1.client.send(command);
        // console.log("All items in the table: ", results.Items);
        return results.Items;
    }
    catch (error) {
        console.error("Error Viewing results:", error);
        throw error;
    }
});
exports.viewAllObservations = viewAllObservations;
