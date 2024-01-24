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
const DB_Operations_1 = require("../DB-files/DB-Operations");
const uuid_1 = require("uuid");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
jest.mock("./s3test.MockUpload");
jest.mock("@aws-sdk/client-dynamodb");
describe("insertObservation", () => {
    it("should insert an observation into the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSend = jest.fn();
        client_dynamodb_1.DynamoDBClient.prototype.send = mockSend;
        mockSend.mockResolvedValue("successfully put item in database");
        const observation = {
            //observation properties
            UserID: (0, uuid_1.v4)(),
            ObservationID: (0, uuid_1.v4)(),
            Notes: "",
            VerificationRating: "",
            coords: "",
            timestamp: "",
            image: ""
        };
        const result = yield (0, DB_Operations_1.insertObservation)(observation);
        expect(mockSend).toHaveBeenCalled();
        expect(result).toBe("successfully put item in database");
    }));
});
