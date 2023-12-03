import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../index.js";

export const createTable = async () => {
  const command = new CreateTableCommand({
    TableName: "Observations",
    AttributeDefinitions: [
      {
        AttributeName: "UserID",
        AttributeType: "S",
    },
      {
        AttributeName: "ObservationID",
        AttributeType: "S",
      },
      {
        AttributeName: "VerificationRating",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "UserID",
        KeyType: "HASH", // Partition Key
      },
      {
        AttributeName: "ObservationID",
        KeyType: "RANGE", // Sort Key
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  try {
    const response = await client.send(command);
    console.log("Table created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};
