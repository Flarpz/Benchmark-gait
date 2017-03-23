"use strict"


module.exports = {
    mean: function (db, run){
        db.get_log_data(run,(log) =>{
            
            
            let logs_with_chunks = log.filter((l) => {return l.chunks.length > 0});
            let a = logs_with_chunks.reduce((prev, current) =>{
                return prev.concat(current.chunks)
            }, []);
            
            let total_time = a.reduce((total,chunk)=>{
                return total + (chunk.stopChunkProcessing - chunk.startChunkProcessing)
            },0)

           console.log((total_time/a.length)/1000)
           
        })
    }
}

