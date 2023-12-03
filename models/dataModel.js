const dataModel = {
    Observation: {
        //UserID: String,    //Don't have this yet   
        Notes: String,     //from submit page
        VerificationRating: Number, //from submit page
        //Verifier: String,  //Don't have this yet
        coords: {
        //altitude: Number, //Not gonna use this
        accuracy: Number, //from mapsAPI
        longitude: Number,//from mapsAPI
        //altitudeAccuracy: Number, //Not gonna use this
        latitude: Number  //from mapsAPI
        },
        timestamp: Number, //from mapsAPI
    },

    // Ethan's object
    // {
    //     position: {
    //       timestamp: 1697650532099,
    //       mocked: false,
    //       provider: 'fused',
    //       coords: {
    //         speed: 0,
    //         heading: 0,
    //         altitude: 0,
    //         accuracy: 2000,
    //         longitude: -122.08395287867832,
    //         altitudeAccuracy: 0,
    //         latitude: 37.42342342342342
    //       }
    //     }
    //      UserID: 245jl2;k1j5r
    //      Notes: "adslkfjasl;kjhf"
    //      VerificationRating: Defualt = 1
    //   }

    llTest: {
        UserID: Number,
        latitude: Number,
        longitude: Number,
        verification: Number
    }

}