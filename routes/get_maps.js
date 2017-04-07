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
                cases[currentline].push({type : character,x :lineNumber,y : currentline });
                if(character === 'B')
                    firstCaseMonster = {y: currentline, x : cases[currentline].length -1, type : 'Spawn'};
                lineNumber++;
            }
        }
        res.setHeader('Content-Type', 'text/json');

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
            while(currentCase !== null && currentCase.type !== 'End' && compteur!==30){
                compteur++;
                if( currentCase.x !==0 && (previousCase === null ||!(previousCase.x===currentCase.x-1 && previousCase.y===currentCase.y))
                    &&  (cases[currentCase.x-1][currentCase.y].type === '-' || cases[currentCase.x-1][currentCase.y].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x-1,x : currentCase.y};
                    currentCase.type = cases[currentCase.x][currentCase.y].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);
                }else if( currentCase.x !==cases.length-1 && (previousCase === null ||!(previousCase.x===currentCase.x+1 && previousCase.y===currentCase.y))
                    &&  (cases[currentCase.x+1][currentCase.y].type === '-' || cases[currentCase.x+1][currentCase.y].type=== 'E')) {
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x + 1, x: currentCase.y};
                    currentCase.type = cases[currentCase.x][currentCase.y].type === 'E' ? 'End' : 'Path';
                    monsterPath.push(currentCase);
                }
                else if( currentCase.y !==0 && (previousCase === null ||!(previousCase.x===currentCase.x && previousCase.y===currentCase.y-1))
                    &&  (cases[currentCase.x][currentCase.y-1].type === '-' || cases[currentCase.x][currentCase.y-1].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x,x : currentCase.y-1};
                    currentCase.type = cases[currentCase.x][currentCase.y-1].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);

                }else if( currentCase.y !== cases[0].length-1 && (previousCase === null ||!(previousCase.x===currentCase.x && previousCase.y===currentCase.y+1))
                    &&  (cases[currentCase.x][currentCase.y+1].type === '-' || cases[currentCase.x][currentCase.y+1].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x,x : currentCase.y+1};
                    currentCase.type = cases[currentCase.x][currentCase.y+1].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);
                }
            }
            res.json({level : _id, cases : cases, monsterPath : monsterPath});
        }
    });

});
/*router.route('/:id').get( (req,res)=>{
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
                cases[currentline].push({type : character,x :lineNumber,y : currentline });
                if(character === 'B')
                    firstCaseMonster = {y: currentline, x : cases[currentline].length -1, type : 'Spawn'};
                lineNumber++;
            }
        }
        res.setHeader('Content-Type', 'text/json');

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
            while(currentCase !== null && currentCase.type !== 'End' && compteur!==30){
                compteur++;
                if( currentCase.x !==0 && (previousCase === null ||!(previousCase.x===currentCase.x-1 && previousCase.y===currentCase.y))
                    &&  (cases[currentCase.x-1][currentCase.y].type === '-' || cases[currentCase.x-1][currentCase.y].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x-1,x : currentCase.y};
                    currentCase.type = cases[currentCase.x][currentCase.y].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);
                }else if( currentCase.x !==cases.length-1 && (previousCase === null ||!(previousCase.x===currentCase.x+1 && previousCase.y===currentCase.y))
                    &&  (cases[currentCase.x+1][currentCase.y].type === '-' || cases[currentCase.x+1][currentCase.y].type=== 'E')) {
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x + 1, x: currentCase.y};
                    currentCase.type = cases[currentCase.x][currentCase.y].type === 'E' ? 'End' : 'Path';
                    monsterPath.push(currentCase);
                }
                else if( currentCase.y !==0 && (previousCase === null ||!(previousCase.x===currentCase.x && previousCase.y===currentCase.y-1))
                        &&  (cases[currentCase.x][currentCase.y-1].type === '-' || cases[currentCase.x][currentCase.y-1].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x,x : currentCase.y-1};
                    currentCase.type = cases[currentCase.x][currentCase.y-1].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);

                }else if( currentCase.y !== cases[0].length-1 && (previousCase === null ||!(previousCase.x===currentCase.x && previousCase.y===currentCase.y+1))
                        &&  (cases[currentCase.x][currentCase.y+1].type === '-' || cases[currentCase.x][currentCase.y+1].type=== 'E')){
                    previousCase = currentCase;
                    currentCase = {y: currentCase.x,x : currentCase.y+1};
                    currentCase.type = cases[currentCase.x][currentCase.y+1].type === 'E'?'End':'Path';
                    monsterPath.push(currentCase);
                }
            }
            res.json({level : _id, cases : cases, monsterPath : monsterPath});
        }
    });
});*/

module.exports = app;