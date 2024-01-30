const { BatchWriteItemCommand, BatchWriteItemCommandInput, AttributeValue } = require("@aws-sdk/client-dynamodb");
const { client } = require("../DB-files/DB-Operations/index.js");
const { insertObservation } = require("../DB-files/DB-Operations/insertObservation.js");
const { viewAllObservations } = require("../DB-files/DB-Operations/viewAllObservations.js");
const { createTable } = require("../DB-files/DB-Operations/createTable.js");

//For HTP Handling (funcitons using http fetch data)

const ObservationRepository = require('../repositories/observationRepository');
const model = require('../models/dataModel');

function sendAll(req,res){
    //This is to grab all coordinates from the database, and send them back to the front end
    //This is to grab all coordinates from the database, and send them back to the front end
    const points = viewAllObservations();
    res.json(points.body);

}

function arrayTest(req,res){
  console.log("API HIT")
    //Generate random array of points in Gunnison, and send to the front end.
    points = [
      {
        "coords": {
          "latitude": 38.55855855855856,
          "longitude": -106.913873653868,
          "accuracy": 15.385000228881836
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1,
        "timestamp": 1702323793519
      },
      {
        "coords": {
          "latitude": 38.556606096839796,
          "longitude": -106.91380656348329,
          "accuracy": 14.915622893598038
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.05,
        "timestamp": 1702323793520
      },
      {
        "coords": {
          "latitude": 38.554653635121035,
          "longitude": -106.91373947309859,
          "accuracy": 14.445339558314239
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.1,
        "timestamp": 1702323793521
      },
      {
        "coords": {
          "latitude": 38.55270117340227,
          "longitude": -106.91367239222167,
          "accuracy": 13.975056470577792
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.15,
        "timestamp": 1702323793522
      },
      {
        "coords": {
          "latitude": 38.55074871168351,
          "longitude": -106.91360532111552,
          "accuracy": 13.504773630570562
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.2,
        "timestamp": 1702323793523
      },
      {
        "coords": {
          "latitude": 38.548796249964746,
          "longitude": -106.91353824980443,
          "accuracy": 13.034491048454715
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.25,
        "timestamp": 1702323793524
      },
      {
        "coords": {
          "latitude": 38.54684378824598,
          "longitude": -106.91347117831161,
          "accuracy": 12.564208734392562
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.3,
        "timestamp": 1702323793525
      },
      {
        "coords": {
          "latitude": 38.54489132652722,
          "longitude": -106.91340410666017,
          "accuracy": 12.09392669854609
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.35,
        "timestamp": 1702323793526
      },
      {
        "coords": {
          "latitude": 38.542938864808456,
          "longitude": -106.91333703486933,
          "accuracy": 11.62364495107781
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.4,
        "timestamp": 1702323793527
      },
      {
        "coords": {
          "latitude": 38.54098640308969,
          "longitude": -106.91326996295722,
          "accuracy": 11.153363502150755
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.45,
        "timestamp": 1702323793528
      },
      {
        "coords": {
          "latitude": 38.53903394137093,
          "longitude": -106.91320289094296,
          "accuracy": 10.683082361937124
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.5,
        "timestamp": 1702323793529
      },
      {
        "coords": {
          "latitude": 38.53708147965217,
          "longitude": -106.91313581884576,
          "accuracy": 10.212801540600208
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.55,
        "timestamp": 1702323793530
      },
      {
        "coords": {
          "latitude": 38.53512901793341,
          "longitude": -106.91306874668493,
          "accuracy": 9.742521048312347
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.6,
        "timestamp": 1702323793531
      },
      {
        "coords": {
          "latitude": 38.53317655621465,
          "longitude": -106.9130016744778,
          "accuracy": 9.272240895246142
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.65,
        "timestamp": 1702323793532
      },
      {
        "coords": {
          "latitude": 38.53122409449588,
          "longitude": -106.91293460223171,
          "accuracy": 8.801961091574142
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.7,
        "timestamp": 1702323793533
      },
      {
        "coords": {
          "latitude": 38.529271632777124,
          "longitude": -106.9128675299531,
          "accuracy": 8.331681647469797
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.75,
        "timestamp": 1702323793534
      },
      {
        "coords": {
          "latitude": 38.52731917105836,
          "longitude": -106.91280045764846,
          "accuracy": 7.861402573106045
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.8,
        "timestamp": 1702323793535
      },
      {
        "coords": {
          "latitude": 38.5253667093396,
          "longitude": -106.91273338532429,
          "accuracy": 7.391123878665571
        },
        "Notes": "This is the notes section",
        "VerificationRating": 1.85,
        "timestamp": 1702323793536
      },
    
    ];
    res.json(points)
}

function addObs(req, res, {
    UserID,
    ObservationID,
    PhotoFileLocation,
    ObsDate,
    LocationData,
    Notes,
    VerificationRating,
    Verifier
  }) {
    reqBod = req.body;
    // console.log("CONTROLLER SEES: ", reqBod);

  
  
  const observationData = {
    LocationData: {}
  }

  insertObservation(reqBod)
      .then(() => {
        res.status(200).send('Observation added successfully');
      })
      .catch(error => {
        console.error('Error adding observation:', error);
        res.status(500).send('Internal Server Error');
      });
}

function setupTable(req, res){
  createTable(req.body)
      .then(()=>{
        res.status(200).send('Table Created Successfully')
      })
      .catch(error => {
        console.error('Error creating table: ', error);
        res.status(500).send("Internal Server Error")
      })
}

function getpinInfo(req,res){
  //This will take in info from a selected pin, and send back lat, long, notes, and potential image.
}
  

module.exports = {
    sendAll,
    arrayTest,
    addObs,
    setupTable,
    getpinInfo
};