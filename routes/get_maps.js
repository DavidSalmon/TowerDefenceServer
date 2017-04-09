/**
 * Created by David Salmon on 05/04/2017.
 */
const express = require('express');
const MapJSON = require('../Entities/MapJSON');
const MapCase = require('../Entities/MapCase');

const MapFileDataHelper = require('../Helper/MapFileDataHelper');
const fs = require('fs');

var app = express();






app.use('/:id',function (req, res, next) {
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
        if (err){
            res.send({error : "map not found"});
            return;
        }

        let mapDataHelper = new MapFileDataHelper(data);

        let {cases,spawnCase} = mapDataHelper.extractCasesFromFileData();
        respJSON.cases = cases;
        //Split the text file for each new line

        //Monster spawn case
        /*let firstCaseMonster = null;


        respJSON.cases = extractMapCasesFromTxt(data);
        let lines = data.replace(new RegExp('\r', 'g'),'').split('\n');
        for(let line of lines){
            respJSON.cases.push([]);
            let currentline = respJSON.cases.length -1;
            let lineNumber = 0;
            for(let character of line){
                respJSON.cases[currentline].push(new MapCase(lineNumber,currentline,getClass(character)));
                if(character === 'B')
                    firstCaseMonster = new MapCase(lineNumber,currentline,getClass(character));
                lineNumber++;
            }
        }*/
        //No begin path
        if(spawnCase === null)
            res.json({error : 'first monster case not found in map'});
        //No case in map
        else if(respJSON.cases.length===0 && respJSON.cases[0].length === 0){
            res.json({error : 'bad format map'});
        }else{
            respJSON.monsterPath.push(spawnCase);
            let currentCase = spawnCase;
            let previousCase = null;
            while(currentCase.type !== __END_CLASS){
                let nextCase =null;
                if(currentCase.y !==0 && nextCase === null){
                    nextCase =checkNextCase(respJSON.cases,currentCase,previousCase,currentCase.x,currentCase.y-1);
                } if(currentCase.y !==respJSON.cases.length-1 && nextCase === null){
                    nextCase=checkNextCase(respJSON.cases,currentCase,previousCase,currentCase.x,currentCase.y+1);
                }if(currentCase.x !==0 && nextCase === null){
                    nextCase=checkNextCase(respJSON.cases,currentCase,previousCase,currentCase.x-1,currentCase.y);
                }if(currentCase.x !== respJSON.cases[0].length-1 && nextCase === null){
                    nextCase=checkNextCase(respJSON.cases,currentCase,previousCase,currentCase.x+1,currentCase.y);
                }

                if(nextCase === null){
                    res.send({error : "End path not found"});
                    return;
                }else{
                    previousCase = currentCase;
                    currentCase = nextCase;
                    respJSON.monsterPath.push(currentCase);
                }
            }
            res.json(respJSON);
        }
    });

});





function extractMapCasesFromTxt(textContent) {

}

function checkNextCase(cases,currentCase,previousCase,x,y){
    if((previousCase === null ||!(previousCase.y===y && previousCase.x===x))
        &&(cases[y][x].type === __PATH_CLASS || cases[y][x].type=== __END_CLASS))
        return new MapCase(x,y,cases[y][x].type);
    return null;
}

module.exports = app;