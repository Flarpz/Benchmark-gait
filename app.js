"use strict";
const rawdataDb = require('./database/rawData_db_module.js');
const logDb = require('./database/logData_db_module.js');
const mean = require('./mean_chunk_calc.js').mean;
const mean_end_to_end = require('./mean_end_to_end.js').end_to_end;
// connect to rawdatadb
rawdataDb.connect();

//connect to logging db
logDb.connect();

let run = parseInt(process.argv[2]);
console.log("argument : "+ run);
console.log("Connecting to database..");

let mongo_connect = setInterval(function(){
    let connected = logDb.is_connected();
    if(connected){
        clearInterval(mongo_connect);
        console.log("Connected to database")
        mean(logDb, run)
        mean_end_to_end(rawdataDb, run)
    }
}, 300)




