"use strict"

const MongoClient = require('mongodb').MongoClient;
//URL to mongodb
const url = require("./../settings/secret.json").raw_db_connection_string;
let mongodbConnection;

module.exports = {


    connect: function () {
        // Connection to mongodb
        MongoClient.connect(url).then((db) => {
            mongodbConnection = db;
        });
    },

    insert_rawdata: function (raw_data) {
        // Get the documents collection
        if (mongodbConnection != undefined) {
            let collection = mongodbConnection.collection('Measurement');
            // Insert some documents
            collection.insert(raw_data, function (err, result) {
                //console.log("Inserted raw_data to Measurement collection");
            });
        }
        else {
            console.log("MongoDB error in connect");
        }
    },

    disconnect: function () {
        db.close();
    },

    find_user: function (data, socket, sessions, callback) {
        // Select collection "Users"
        let collection = mongodbConnection.collection('Users');
        // trying to fetch data.user in db
        collection.find({ Username: data.user }).toArray(function (err, docs) {
            //console.log("Found the following records");
            //console.log(docs);
            // found user, call callback for regiseter
            if (docs.length > 0) {
                callback(socket, sessions, data);
                socket.user_id = docs[0]._id;
            }
            // User not found dissconnect socket
            else {
                socket.disconnect();
            }
        });
    },

    insert_result: function (result) {
        // Get the documents collection
        var collection = mongodbConnection.collection('Result');
        // Insert some documents
        collection.insert(result, function (err, result) {
            console.log("Inserted result_data to Result collection");
        });
    },

    get_messurement: function () {

    },

    get_result: function () {

    }

    //Connect
    //disconnect
    //Insert / many
    // find user boolean
    // insert messurement
    // insert result
    // get messurement
    // get result


}