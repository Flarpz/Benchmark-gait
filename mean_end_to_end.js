"use strict"
const jsonfile = require('jsonfile');
module.exports = {
    end_to_end: function (db, run) {

        db.get_result(run, (results) => {

            //Compare all the timne stamps with time of insert and create dT
            let time_groups = results.reduce((prev, result) => {
                let deltaBlock = { ref: result.time_of_insert, time_stamps: result.arrival_ts }
                prev.push(deltaBlock);
                return prev;
            }, [])
            let dTs = time_groups.reduce((prev, time_group) => {
                let temp = [];
                time_group.time_stamps.forEach((ts) => { temp.push(time_group.ref - ts) });
                prev.push(temp);
                return prev;
            }, [])

            let chunkS = dTs[0].length;
            let res = [];
            for (let i = 0; i < chunkS; i++) {
                let s = 0;
                for (let j = 0; j < dTs.length; j++) {
                    s += dTs[j][i];
                }
                res.push(s / dTs.length / 1000);
            }

            jsonfile.writeFile(__dirname+'/res/'+run+'.json', res, {spaces: 2}, function (err) {
                console.error(err)
            })

        })
    }
};