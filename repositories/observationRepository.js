//for CRUD actions (Create Read Update Delete)

const Observation = require('../models/dataModel')

class observationRepository {
    constructor() {
        this.items = [];
      }

    createItem(Item) {
        //for now just push to local points array, when we figure out dynamo, paRse info and push to db as well.
        this.items.push(Item);
    }

    getAll(){
        //for now just return local points array, when we figure out Dynamo this will pull all points from db. 
        return this.items;
    }
}

module.exports = observationRepository;