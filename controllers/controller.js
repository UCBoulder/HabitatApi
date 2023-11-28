const { BatchWriteItemCommand, BatchWriteItemCommandInput, AttributeValue } = require("@aws-sdk/client-dynamodb");
const { Observation } = require('./interfaces');
const { client } = require("../index.js");
const { insertObservation } = require("../DB-files/DB-Operations/insertObservation.js");

//For HTP Handling (funcitons using http fetch data)

const ObservationRepository = require('../repositories/observationRepository');
const model = require('../models/dataModel');

function create(req,res){
    //This is just to parse the coordinates and send them to the database.
    const body = req.body;
}

function sendAll(req,res){
    //This is to grab all coordinates from the database, and send them back to the front end
    //This is to grab all coordinates from the database, and send them back to the front end
    const points = {"NOT YET": "IMPLEMENTED"};
    res.json(points);

}

function arrayTest(req,res){
    //Generate random array of points in Gunnison, and send to the front end.
    points = [
        //yes = 2 no = 0 maybe =1
        { latitude:38.546445943803114, longitude: -106.9122634923445, verification: 0},
        { latitude:38.53707082153294, longitude: -106.91163936226951, verification: 1},
        { latitude:38.54040196118341, longitude: -106.94635060401474, verification: 0},
        { latitude:38.58565979253917, longitude: -106.90209024913248, verification: 1},
        { latitude:38.55237393048004, longitude: -106.9147836664154, verification: 1},
        { latitude:38.55367458872616, longitude: -106.91846219020685, verification: 0},
        { latitude:38.553548088520586, longitude: -106.91188122676483, verification: 2},
        { latitude:38.558539891054025, longitude: -106.92633778462296, verification: 0},
        { latitude:38.55765795191712, longitude: -106.92525179656708, verification: 2},
        { latitude:38.53125989834007, longitude: -106.9244286599948, verification: 0},
        { latitude:38.53750984924373, longitude: -106.9257911397735, verification: 2}
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
  
  
  const observationData = {
    UserID: { S: '0' },
    ObservationID: { S: '0' },
    PhotoFileLocation: { S: 'N/A' },
    ObsDate: { S: new Date().toISOString() },
    LocationData: {reqBod},
    Notes: { S: 'DB TEST' },
    VerificationRating: { N: '1' },
    Verifier: { S: 'Its me' }
  };
  res.status(200)

  insertObservation(observationData)
}
  

module.exports = {
    create,
    sendAll,
    arrayTest,
};