import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';
import { v4 as uuidv4 } from 'uuid';
const { processFile } = require( './s3-Operations/test-Upload.mjs');

export const insertObservation = async (observation: Observation) => {
  const observationDynamoDB: Observation = {
    "UserID": "00", // Change this when you have actual users to pass in
    "ObservationID": uuidv4(),
    "Notes": observation.Notes,
    "VerificationRating": observation.VerificationRating,
    "coords": observation.coords,
    "timestamp": observation.timestamp,
    "image": processFile(observation.image)
  };
  
  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: {
      UserID: { S: observationDynamoDB.UserID },
      ObservationID: { S: observationDynamoDB.ObservationID },
      Notes: { S: observationDynamoDB.Notes },
      VerificationRating: { S: observationDynamoDB.VerificationRating},
      coords: { S: JSON.stringify(observationDynamoDB.coords) },
      timestamp: { N: observationDynamoDB.timestamp },
      observationIamgeURL : { S: observationDynamoDB.image }
    },
  };

  try {
    const command = new PutItemCommand(params);
    const response = await client.send(command);
    console.log("Observation inserted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error inserting observation:", error);
    throw error;
  }
};