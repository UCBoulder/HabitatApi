const dataModel = {
    Observation: {
        UserID: String,    //Not using this yet - defualt to 0
        timestamp: Number, //from mapsAPI
        Notes: String,     //from submit page
        VerificationRating: Number, //from submit - default to 1
    //  Verifier: String,  //implemented later
        coords: {
    //  altitude: Number, //from mapsAPI - not using this
        accuracy: Number, //from mapsAPI
        longitude: Number,//from mapsAPI
    //  altitudeAccuracy: Number, //from mapsAPI - not using this
        latitude: Number  //from mapsAPI
        }
    },

    // Ethan's object
    // {
    //   "Notes": undefined,
    //   "VerificationRating": 1,
    //   "coords": {
    //     "accuracy": 14.8149995803833,
    //     "latitude": 38.547351,
    //     "longitude": -106.9226196
    // },
    //   "timestamp": 1701473299603
    // }

    llTest: {
        UserID: Number,
        latitude: Number,
        longitude: Number,
        verification: Number
    }

}