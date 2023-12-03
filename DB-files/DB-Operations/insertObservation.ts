import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';

export const insertObservation = async () => {
  const newObservation: Observation = {
    UserID: { S: new Date().toISOString() },
    ObservationID: { S: 'someCheatUploadID' },
    PhotoFileLocation: { S: 'someLocation' },
    Date: { S: new Date().toISOString() },
    LocationData: { S: 'someLocationInfo' },
    Notes: { S: 'someNotes' },
    VerificationRating: {N : '0' },
    Verifier: { S: 'someVerifier' },
  };
  

  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: newObservation as unknown as Record<string, AttributeValue>,
  };

  try {
    const command = new PutItemCommand(params);
    const response = await client.send(command);
    console.log("Observation inserted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error inserting cheat upload:", error);
    throw error;
  }
};
