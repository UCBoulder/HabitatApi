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
//When called, this (insertobservation) should tahe the body fron ethan's request as a parameter, and within the function
//pick what we need from it, and form the observation (including adding Observation id, user ID and other fields) and add it to the DB
const insertObservation = (Observation) => __awaiter(void 0, void 0, void 0, function* () {
    // Change insertObservations function parameter to take in the front end's json
    // Add/set UserID, default to 0 for now in Front End json or other variable.
    // Using UUID (or other random method) add/set ObservationID in FE json or other variable.
    // From here he may be able to just upload the whole json object, or we can parse it into arguments for the dynamo command.
    console.log("InsertObs SEES: ", Observation);
    const observationDyanmoDB = {
        "UserID": "00", //can change this when we actually have users to pass in
        "ObservationID": (0, uuid_1.v4)(),
        "Notes": Observation.Notes,
        "VerificationRating": Observation.VerificationRating,
        "coords": JSON.stringify(Observation.coords),
        "timestamp": Observation.timestamp,
        //if you want to take the cords out then you just need to parse the JSON, this makes storing easy for now
    };
    console.log("FINAL OBS: ", observationDyanmoDB);
    const params = {
        TableName: "Observations",
        Item: JSON.parse(JSON.stringify(observationDyanmoDB)),
    };
    try {
        const command = new client_dynamodb_1.PutItemCommand(params);
        const response = yield index_js_1.client.send(command);
        console.log("Observation inserted successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error inserting cheat upload:", error);
        throw error;
    }
});
exports.insertObservation = insertObservation;
