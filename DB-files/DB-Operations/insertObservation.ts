import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export const insertObservation = async (Observation: Observation) => {

  const observationDyanmoDB: Observation = {
    UserID: uuidv4(),//can change this when we actually have users to pass in
    ObservationID: uuidv4(),
    Notes: Observation.Notes,
    VerificationRating: Observation.VerificationRating,
    coords: JSON.stringify(Observation.coords),
    //if you want to take the cords out then you just need to parse the JSON, this makes storing easy for now
  }
  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: JSON.parse(JSON.stringify(observationDyanmoDB)),
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
