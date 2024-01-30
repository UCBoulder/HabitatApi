import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../index.js";

export const getObservation = async (userID: string, observationID: string) => {
    const params = {
        TableName: "Observations",
        Key: {
            "userID": { S: userID }, 
            "ObservationID": { S: observationID },
        },
    };
    
    const command = new GetItemCommand(params);
    
    try {
        const result = await client.send(command);
        if (result.Item) {
            console.log("Item retrieved:", result.Item);
            return result.Item;
        } 
    } catch (error) {
        console.error("Error getting the item:", error);
        throw error;
    }
}
