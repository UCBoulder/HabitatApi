const dataModel = {
    Observation: {
        UserID: String,    //from hardware-ID     
        timestamp: Number, //from mapsAPI
        Notes: String,     //from submit page
        VerificationRating: Number, //from submit page
        Verifier: String,  //implemented later
        coords: {
        altitude: Number, //from mapsAPI
        accuracy: Number, //from mapsAPI
        longitude: Number,//from mapsAPI
        altitudeAccuracy: Number, //from mapsAPI
        latitude: Number  //from mapsAPI
        }
    },

    llTest: {
        UserID: Number,
        latitude: Number,
        longitude: Number,
        verification: Number
    }

}