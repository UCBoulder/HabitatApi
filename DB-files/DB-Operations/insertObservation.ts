import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';

//When called, this (insertobservation) should tahe the body fron ethan's request as a parameter, and within the function
//, pick what we need from it, and fomm the observation (including adding post id, and other fields) and add it to the DB
export const insertObservation = async (Observation: Observation) => {
  





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
