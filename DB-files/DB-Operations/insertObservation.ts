import { PutItemCommand, PutItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

//When called, this (insertobservation) should tahe the body fron ethan's request as a parameter, and within the function
//pick what we need from it, and form the observation (including adding Observation id, user ID and other fields) and add it to the DB
export const insertObservation = async (Observation: Observation) => {
    // Change insertObservations function parameter to take in the front end's json
    // Add/set UserID, default to 0 for now in Front End json or other variable.
    // Using UUID (or other random method) add/set ObservationID in FE json or other variable.
    // From here he may be able to just upload the whole json object, or we can parse it into arguments for the dynamo command.
    // console.log("InsertObs SEES: ", Observation);

  const observationDyanmoDB: Observation = {
    "UserID": "00",//can change this when we actually have users to pass in
    "ObservationID": uuidv4(),
    "Notes": Observation.Notes,
    "VerificationRating": Observation.VerificationRating,
    coords: JSON.stringify(Observation.coords),
    "timestamp": Observation.timestamp,
    //if you want to take the cords out then you just need to parse the JSON, this makes storing easy for now
  }
  console.log("FINAL OBS: ", observationDyanmoDB)
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
