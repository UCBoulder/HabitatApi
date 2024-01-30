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
        //yes = 2 no = 0 maybe =1
        {
          coords: {
            latitude: 38.55855855855856,
            longitude: -106.913873653868,
            accuracy: 15.385000228881836
          },
          Notes: 'This is the notes section',
          VerificationRating: 1,
          timestamp: 1702323793519,
        },
        {
          coords: {
            latitude: 38.53707082153294,
            longitude: -106.91163936226951,
            accuracy: 9.431432543321121
          },
          Notes: 'This is the notes section',
          VerificationRating: 2,
          timestamp: 1702323793518,
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