const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.deleteOneObs = async (ObservationIDToDelete) => {
  const tableName = "Observations";

  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      ObservationID: ObservationIDToDelete,
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
