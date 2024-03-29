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
    "userID": observation.userID, // Change this when you have actual users to pass in
    "ObservationID": uuidv4(),
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
  
  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: {
      UserID: { S: observationDynamoDB.userID },
      ObservationID: { S: observationDynamoDB.ObservationID },
      // plantDescription: { S: observationDynamoDB.plantDescription },
      VerificationRating: { S: observationDynamoDB.VerificationRating},
      coords: { S: JSON.stringify(observationDynamoDB.coords) },
      timestamp: { N: observationDynamoDB.timestamp },
      observationIamgeUrl : { S: observationDynamoDB.image },
      /*estimatedCover : {S: observationDynamoDB.estimatedCover}, 
      estimatedArea : {S: observationDynamoDB.estimatedArea},
      locationDescription : {S: observationDynamoDB.locationDescription},
      ownership : {S: observationDynamoDB.ownership}*/
      Notes : {S: JSON.stringify(observationDynamoDB.Notes) }
    },
  };

  try {
    console.log(observationDynamoDB)
    const command = new PutItemCommand(params);
    const response = await client.send(command);
    console.log("Observation inserted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error inserting observation:", error);
    throw error;
  }
};