import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../index.js";
import { ReturnObservation } from "./interfaces";
import { s3GetPhoto_SignedURL } from '../../DB-files/DB-Operations/s3-Operations/s3getObject';
export const getObservation = async (userID: string, observationID: string) => {
    const params = {
        TableName: "Observations",
        Key: {
            "userID": { S: userID }, 
            "ObservationID": { S: observationID},
        },
    };
    
    const command = new GetItemCommand(params);
    
    try {
        const result = await client.send(command);
        if (result.Item) {
            console.log("Item retrieved:", result.Item);
            //formatting for the image URL
            const formattedResult: ReturnObservation = {
                "UserId": result.Item.UserID.S||" ",
                "ObservationID": result.Item.ObservationID.S||" ",
                "Notes": result.Item.Notes.S||" ",
                "VerificationRating": result.Item.VerificationRating.S|| " ",
                "coords": JSON.parse(result.Item.coords.S||" "),
                "timestamp": result.Item.timestamp.S||" ",
                "observationImageUrl": await s3GetPhoto_SignedURL(result.Item.observationImageURL.S||" ")||" "
            }
            return formattedResult;
        }
        return null;
    } catch (error) {
        console.error("Error getting the item:", error);
        throw error;
    }
}
