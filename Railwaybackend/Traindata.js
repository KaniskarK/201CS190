const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/', function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
  }
});e

// Define the train data collection
const trainDataCollection = client.collection('train');

// Define the train data
const trainData = {
        companyName : "Train Central ",
        clientID: "efd7cb50-4610-43f7-9209-eed334fccffe",
        clientSecret : "daAZLZMPxAtEKmLN",
        ownerName: "Sample",
        ownerEmail: " sample@abc.edu",
        rollNo: "178"
    };

