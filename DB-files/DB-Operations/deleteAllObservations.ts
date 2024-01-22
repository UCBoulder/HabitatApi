//function for deleting all entries that have a verificationRating of 0, if the entry has been verified as not cheatgrass
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const deleteItemsWithZeroVerificationRating = async () => {
  const tableName = "Observations";

  const scanCommand = new ScanCommand({
    TableName: tableName,
    FilterExpression: 'verificationRating = :rating',
    ExpressionAttributeValues: {
      ':rating': 0,
    },
  });

  try {
    const scanResponse = await docClient.send(scanCommand);
    const itemsToDelete = scanResponse.Items;

    for (const item of itemsToDelete || []) {
      const deleteCommand = new DeleteCommand({
        TableName: tableName,
        Key: {
          ObservationID: item.ObservationID,
        },
      });

      await docClient.send(deleteCommand);
    }

    console.log('Items deleted successfully:', itemsToDelete);
    return itemsToDelete;
  } catch (error) {
    console.error('Error deleting items:', error);
    throw error; 
  }
};