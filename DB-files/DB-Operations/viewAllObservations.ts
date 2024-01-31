import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../index.js";

export const viewAllObservations = async () => {

    const scanInput = {
        TableName: "Observations",
    };
    
    const command = new ScanCommand(scanInput);
    
    try {
        const results = await client.send(command);
        // console.log("All items in the table: ", results.Items);
        return results.Items;
    } catch (error) {
        console.error("Error Viewing results:", error);
        throw error;
    }
    }