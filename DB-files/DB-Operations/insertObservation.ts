import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';
import { v4 as uuidv4 } from 'uuid';
import { processFile } from '../../DB-files/DB-Operations/s3-Operations/test-Upload';


export const insertObservation = async (observation: Observation) => {
  const imageLocation = await processFile(observation.image);
  // console.log(observation.image)

  if (!imageLocation) {
    throw new Error("Failed to process image.");
  }
  const observationDynamoDB: Observation = {
    "UserID": "00", // Change this when you have actual users to pass in
    "ObservationID": uuidv4(),
    "plantDescription": observation.plantDescription,
    "locationDescription": observation.locationDescription,
    "VerificationRating": observation.VerificationRating,
    "coords": observation.coords,
    "timestamp": observation.timestamp,
    "image": imageLocation
  };
  
  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: {
      UserID: { S: observationDynamoDB.UserID },
      ObservationID: { S: observationDynamoDB.ObservationID },
      plantDescription: { S: observationDynamoDB.plantDescription },
      VerificationRating: { S: observationDynamoDB.VerificationRating},
      locationDescription: { S: observationDynamoDB.locationDescription},
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