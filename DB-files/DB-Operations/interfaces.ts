import { AttributeValue } from "@aws-sdk/client-dynamodb";

// interface Cords {
//     speed: number;
//     heading: number;
//     altitude: number;
//     accuracy: number;
//     longitude: number;
//     altitudeAccuracy: number;
//     latitude: number;
//   }
  
//   interface Position {
//     timestamp: number;
//     mocked: boolean;
//     provider: string;
//     coords: Coords;
//   }
  
  export interface Observation {
    // position: Position;
    UserID: string;
    ObservationID: string; 
    Notes: string;
    VerificationRating: string;
    coords: string;
    timestamp: string;
    image : string;
  }
  
  // observation {
    //   "Notes": undefined,
    //   "VerificationRating": 1,
    //   "coords": {
    //     "accuracy": 14.8149995803833,
    //     "latitude": 38.547351,
    //     "longitude": -106.9226196
    // },
    //   "timestamp": 1701473299603
    // }