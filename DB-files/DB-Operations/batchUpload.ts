import { BatchWriteItemCommand, BatchWriteItemCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { Observation } from './interfaces';
import { client } from "../index.js";

export const batchUploadItems = async (observations: Observation[]) => {
  const putRequests = observations.map((observation) => ({
    PutRequest: {
      Item: observation as unknown as Record<string, AttributeValue>,
    },
  }));

  const batchSize = 25; // Specify the desired batch size, max 25
  const batchPromises: Promise<any>[] = [];

  for (let i = 0; i < putRequests.length; i += batchSize) {
    const batchWriteInput: BatchWriteItemCommandInput = {
      RequestItems: {
        "Observations": putRequests.slice(i, i + batchSize),
      },
    };

    const command = new BatchWriteItemCommand(batchWriteInput);
    const promise = client.send(command);
    batchPromises.push(promise);
  }

  try {
    const batchResults = await Promise.all(batchPromises);
    console.log("Batch upload successful:", batchResults);
    return batchResults;
  } catch (error) {
    console.error("Error performing batch upload:", error);
    throw error;
  }
};
