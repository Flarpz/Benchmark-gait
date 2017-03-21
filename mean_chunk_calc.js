"use strict"


module.exports = {
    mean: function (db, run){
        db.get_log_data(run,(log) =>{
            //console.log(JSON.stringify(log,null,2))
            let logs_with_chunks = log.filter((l) => {return l.chunks.length > 0});
            let a = [];

            logs_with_chunks.forEach((log) => {a.push(log.chunks)});
            let total_time = a.reduce((total,chunk)=>{
                console.log("TOTAL: "+ total + "Chunk: "+ JSON.stringify(chunk))
                return total + (chunk.stopChunkProcessing - chunk.startChunkProcessing)
            },0)
            /*
            let chunks = logs_with_chunks.reduce((tot, log)=>{
                console.log("The current chunk"+ log.chunks)
            },[]);

            */

           console.log(total_time)
           //console.log(JSON.stringify(a,null,2))
        })
    }
}


/*
function getlogdb(){
    console.log(run);
    logDb.get_log_data(run, function (docs) {
        console.log(JSON.stringify(docs, null, 2));
    });
}

*/
