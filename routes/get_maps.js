/**
 * Created by David Salmon on 05/04/2017.
 */
const express = require('express');


var app = express();
//const router = express.Router();
app.use('/:id',function (req, res, next) {
    const _id = req.params.id;
    let fs = require('fs');
    fs.readFile('./maps/Map'+_id+'.txt', 'utf8', function(err, data) {
        if (err){
            res.send({error : "map not found"});
            return;
        }
        let respJSON = [[]];
        let lines = data.replace(new RegExp('\r', 'g'),'').split('\n');
        let cases = [];

        let firstCaseMonster = null;
        for(let line of lines){
            cases.push([]);
            let currentline = cases.length -1;
            let lineNumber = 0;
            for(character of line){
                //cases[currentline].push({type : character,x :lineNumber,y : currentline });

                cases[currentline].push({type : getClass(character),x :lineNumber,y : currentline });

                if(character === 'B')
                    firstCaseMonster = {y: currentline, x : cases[currentline].length -1, type : 'begin'};
                lineNumber++;
            }
            console.log(firstCaseMonster);
        }
        res.setHeader('Content-Type', 'text/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if(firstCaseMonster === null){
            res.json({error : 'first monster case not found in map'});
        }else if(cases.length===0 && cases[0].length === 0){
            res.json({error : 'bad format map'});
        }else{
            let monsterPath = [];
            monsterPath.push(firstCaseMonster);
            let currentCase = firstCaseMonster;
            let previousCase = null;
            let compteur = 0;
            while(currentCase !== null && currentCase.type !== 'End'){
                compteur++;
                if(cases[currentCase.y][currentCase.x-1] === undefined)
                    console.log(currentCase.y+' '+(currentCase.x-1))
                if( currentCase.y !==0 && (previousCase === null ||!(previousCase.y===currentCase.y-1 && previousCase.x===currentCase.x))
                    &&  (cases[currentCase.y-1][currentCase.x].type === 'path' || cases[currentCase.y-1][currentCase.x].type=== 'end')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.y-1,x : currentCase.x};
                    currentCase.type = cases[currentCase.y][currentCase.x].type === 'end'?'End':'Path';
                    monsterPath.push(currentCase);
                }else if( currentCase.y !==cases.length-1 && (previousCase === null ||!(previousCase.y===currentCase.y+1 && previousCase.x===currentCase.x))
                    &&  (cases[currentCase.y+1][currentCase.x].type === 'path' || cases[currentCase.y+1][currentCase.x].type=== 'end')) {
                    previousCase = currentCase;
                    currentCase = {y: currentCase.y + 1, x: currentCase.x};
                    currentCase.type = cases[currentCase.y][currentCase.x].type === 'end' ? 'End' : 'Path';
                    monsterPath.push(currentCase);
                }
                else if( currentCase.x !==0 && (previousCase === null ||!(previousCase.y===currentCase.y && previousCase.x===currentCase.x-1))
                    &&  (cases[currentCase.y][currentCase.x-1].type === 'path' || cases[currentCase.y][currentCase.x-1].type=== 'end')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.y,x : currentCase.x-1};
                    currentCase.type = cases[currentCase.y][currentCase.x].type === 'end'?'End':'Path';
                    monsterPath.push(currentCase);

                }else if( currentCase.x !== cases[0].length-1 && (previousCase === null ||!(previousCase.y===currentCase.y && previousCase.x===currentCase.x+1))
                    &&  (cases[currentCase.y][currentCase.x+1].type === 'path' || cases[currentCase.y][currentCase.x+1].type=== 'end')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.y,x : currentCase.x+1};
                    currentCase.type = cases[currentCase.y][currentCase.x].type === 'end'?'End':'Path';
                    monsterPath.push(currentCase);
                }
            }
            res.json({level : _id, cases : cases, monsterPath : monsterPath});
        }
    });

});



function getClass(caseType){
    let className = '';
    switch(caseType){
        case '0':
            className = 'stone';
            break;
        case '-':
            className = 'path';
            break;
        case 'B':
            className = 'begin';
            break;
        case 'E':
            className = 'end';
            break;
    }
    return className;
}

module.exports = app;