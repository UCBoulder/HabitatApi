//function for if verifier decides to delete an entries manually using observation ID
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (ObservationIDToDelete: string) => {
  const tableName = "Observations";

  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      ObservationID: "observationIDToDelete",
    },
  });

  try {
    const response = await docClient.send(command);
    console.log("Item deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Rethrow the error to indicate failure
  }
};