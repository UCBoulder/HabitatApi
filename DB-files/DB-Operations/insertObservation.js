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
exports.insertObservation = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../index.js");
const uuid_1 = require("uuid");
const test_Upload_1 = require("../../DB-files/DB-Operations/s3-Operations/test-Upload");
const insertObservation = (observation) => __awaiter(void 0, void 0, void 0, function* () {
    const imageLocation = yield (0, test_Upload_1.processFile)(observation.image);
    // console.log(observation.image)
    if (!imageLocation) {
        throw new Error("Failed to process image.");
    }
    const observationDynamoDB = {
        "userID": observation.userID, // Change this when you have actual users to pass in
        "ObservationID": (0, uuid_1.v4)(),
        // "plantDescription": observation.plantDescription,
        "Notes": observation.Notes,
        "VerificationRating": observation.VerificationRating,
        "coords": observation.coords,
        "timestamp": observation.timestamp,
        "image": imageLocation,
        /*"estimatedCover": observation.estimatedCover,
        "estimatedArea": observation.estimatedArea,
        "locationDescription": observation.locationDescription,
        "ownership": observation.ownership*/
    };
    const params = {
        TableName: "Observations",
        Item: {
            UserID: { S: observationDynamoDB.userID },
            ObservationID: { S: observationDynamoDB.ObservationID },
            // plantDescription: { S: observationDynamoDB.plantDescription },
            VerificationRating: { S: observationDynamoDB.VerificationRating },
            coords: { S: JSON.stringify(observationDynamoDB.coords) },
            timestamp: { N: observationDynamoDB.timestamp },
            observationIamgeUrl: { S: observationDynamoDB.image },
            /*estimatedCover : {S: observationDynamoDB.estimatedCover},
            estimatedArea : {S: observationDynamoDB.estimatedArea},
            locationDescription : {S: observationDynamoDB.locationDescription},
            ownership : {S: observationDynamoDB.ownership}*/
            Notes: { S: JSON.stringify(observationDynamoDB.Notes) }
        },
    };
    try {
        console.log(observationDynamoDB);
        const command = new client_dynamodb_1.PutItemCommand(params);
        const response = yield index_js_1.client.send(command);
        console.log("Observation inserted successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error inserting observation:", error);
        throw error;
    }
});
exports.insertObservation = insertObservation;
