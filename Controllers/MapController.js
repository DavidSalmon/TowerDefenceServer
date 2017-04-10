
const MapFileDataHelper = require('../Helper/MapFileDataHelper');
const MapJSON = require('../Entities/MapJSON');
const fs = require('fs');




module.exports = {
  // GET /items/:id
  handleGetMapRequest: function(req, res, next) {
    //Response header
    res.setHeader('Content-Type', 'text/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //Map number
    const _id = req.params.id;
    let respJSON = new MapJSON(_id);
    //Read the map file
    fs.readFile('./maps/Map'+_id+'.txt', 'utf8', function(err, data) {
        //Return an error if the map file is not found
        if (err)
            return res.send({error : "map not found"});
        let {cases,spawnCase} = MapFileDataHelper.extractCasesFromFileData(data);
        respJSON.cases = cases;
        if(spawnCase === null)
            return res.json({error : 'first monster case not found in map'});
        //No case in map
        else if(respJSON.cases.length===0 && respJSON.cases[0].length === 0){
            return res.json({error : 'bad format map'});
        }else{
            respJSON.monsterPath = MapFileDataHelper.getMonsterPath(cases,spawnCase);
            if(respJSON.monsterPath === null)
               return res.send({error : "Bad construction of the monsterPath"});
            return res.json(respJSON);
        }
    });
  },
}
