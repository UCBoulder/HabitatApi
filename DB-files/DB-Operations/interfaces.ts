import { AttributeValue } from "@aws-sdk/client-dynamodb";

export interface Observation{
    UserID: AttributeValue;
    ObservationID: AttributeValue;
    PhotoFileLocation?: AttributeValue;
    Date?: AttributeValue;
    LocationData?: AttributeValue;
    Notes?: AttributeValue;
    VerificationRating: AttributeValue;
    Verifier?: AttributeValue;
    Treated?: AttributeValue;
}
