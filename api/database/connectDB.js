let mongoose = require("mongoose");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://iprashant2401:qwerty9730@cluster0-lecta.mongodb.net/test?retryWrites=true&w=majority";

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("cashsheet").collection("users");
      // perform actions on the collection object
      client.close();
    });
  }
}

module.exports = new Database();
