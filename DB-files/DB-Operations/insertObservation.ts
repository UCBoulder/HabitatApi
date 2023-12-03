import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';

//When called, this (insertobservation) should tahe the body fron ethan's request as a parameter, and within the function
//pick what we need from it, and form the observation (including adding Observation id, user ID and other fields) and add it to the DB
export const insertObservation = async (Observation: Observation) => {
    // Change insertObservations function parameter to take in the front end's json
    // Add/set UserID, default to 0 for now in Front End json or other variable.
    // Using UUID (or other random method) add/set ObservationID in FE json or other variable.
    // From here he may be able to just upload the whole json object, or we can parse it into arguments for the dynamo command.


  const params: PutItemCommandInput = {
    TableName: "Observations",
    Item: Observation as unknown as Record<string, AttributeValue>,
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
