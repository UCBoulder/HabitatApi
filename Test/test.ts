import { insertObservation } from "../DB-files/DB-Operations";
import * as AWSMock from "aws-sdk-mock";
import { DynamoDB } from "aws-sdk";
import { client } from '../DB-files/index.js';
import { v4 as uuidv4 } from 'uuid';
import {DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Observation } from '../DB-files/DB-Operations/interfaces';


jest.mock("@aws-sdk/client-dynamodb");

describe("insertObservation", () => {
    it("should insert an observation into the database", async () => {
        const mockSend = jest.fn();
        DynamoDBClient.prototype.send = mockSend;
        mockSend.mockResolvedValue("successfully put item in database");

        const observation: Observation = {
            //observation properties
            UserID: uuidv4(),
            ObservationID: uuidv4(),
            Notes: "",
            VerificationRating: "",
            coords: "",
            timestamp: "",
            image: ""
        };
        const result = await insertObservation(observation);
        
        expect(mockSend).toHaveBeenCalled();
        expect(result).toBe("successfully put item in database");
    });
});
