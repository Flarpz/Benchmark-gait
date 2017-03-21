"use strict"

const MongoClient = require('mongodb').MongoClient;
//URL to mongodb
const url = require("./../settings/secret.json").log_db_connection_string;
let mongodbConnection;

module.exports = {

  connect: function () {
        // Connection to mongodb
        MongoClient.connect(url).then((db) => {
            mongodbConnection = db;
        });
    },

    insert_log: function (log) {
        // Get the documents collection
        if (mongodbConnection != undefined) {
            let collection = mongodbConnection.collection('TimeLogs');
            // Insert some documents
            collection.insert(log, function (err, result) {
                //console.log("Inserted raw_data to Measurement collection");
            });
        }
        else {
            console.log("MongoDB error in connect");
        }
    },

    is_connected: function(){
        return mongodbConnection != undefined;
    },

    get_log_data: function (run1, callback){
        // Select collection "Users"
        let collection = mongodbConnection.collection('TimeLogs');
        // trying to fetch data.user in db

        collection.find({run : run1}).toArray(function (err, docs) {
            //console.log("Found the following records");
            // found user, call callback for regiseter
            if (docs.length > 0) {
                callback(docs);
            }
            else{
                console.log('error');
            }

        });
    },

}

