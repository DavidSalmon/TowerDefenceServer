/**
* Created by David Salmon on 07/04/2017.
*/
const MapCase = require('../Entities/MapCase');



const __BEGIN_CLASS = 'texture path-1';
const __END_CLASS = 'texture path-1';
const __PATH_CLASS = 'texture path-2';
const __STONE_CLASS = 'texture grass-1';

const __BEGIN_TYPE = 'begin';
const __END_TYPE = 'end';
const __PATH_TYPE = 'path';
const __STONE_TYPE = 'stone';

module.exports = {
  extractCasesFromFileData: function(data){
    let cases = [];
    let lines = data.replace(new RegExp('\r', 'g'),'').split('\n');
    let spawnCase = null;
    for(let line of lines){
      cases.push([]);
      let currentline = cases.length -1;
      let lineNumber = 0;
      for(let character of line){
        cases[currentline].push(new MapCase(lineNumber,currentline,getCaseType(character),getHTMLClassChar(character)));
        if(character === 'B')
        spawnCase = new MapCase(lineNumber,currentline,getCaseType(character),getHTMLClassChar(character));
        lineNumber++;
      }
    }
    return {cases : cases, spawnCase : spawnCase};
  },

  getMonsterPath : function(caseList,spawnCase){
    let monsterPath = [spawnCase];
    let currentCase = spawnCase;
    let previousCase = null;
    while(currentCase.type !== 'end'){
      let nextCase =null;
      if(currentCase.y !==0 && nextCase === null){
        nextCase =checkNextCase(caseList,currentCase,previousCase,currentCase.x,currentCase.y-1);
      } if(currentCase.y !==caseList.length-1 && nextCase === null){
        nextCase=checkNextCase(caseList,currentCase,previousCase,currentCase.x,currentCase.y+1);
      }if(currentCase.x !==0 && nextCase === null){
        nextCase=checkNextCase(caseList,currentCase,previousCase,currentCase.x-1,currentCase.y);
      }if(currentCase.x !== caseList[0].length-1 && nextCase === null){
        nextCase=checkNextCase(caseList,currentCase,previousCase,currentCase.x+1,currentCase.y);
      }
      if(nextCase === null){
        return null;
      }else{
        previousCase = currentCase;
        currentCase = nextCase;
        monsterPath.push(currentCase);
      }
    }
    return monsterPath;
  }
}




function checkNextCase(cases,currentCase,previousCase,x,y){
    try{
        if((previousCase === null ||!(previousCase.y===y && previousCase.x===x))
            &&(cases[y][x].type === 'path' || cases[y][x].type=== 'end'))
            return new MapCase(x,y,cases[y][x].type);
    }catch(e){
        console.log(e)
        return null;
    }

  return null;
}


function getHTMLClassChar(caseType){
  let className = '';
  switch(caseType){
    case '0':
    className = __STONE_CLASS;
    break;
    case '-':
    className = __PATH_CLASS;
    break;
    case 'B':
    className = __BEGIN_CLASS;
    break;
    case 'E':
    className = __END_CLASS;
    break;
  }
  return className;
}


function getCaseType(caseType){
    let className = '';
    switch(caseType){
        case '0':
            className = __STONE_TYPE;
            break;
        case '-':
            className = __PATH_TYPE;
            break;
        case 'B':
            className = __BEGIN_TYPE;
            break;
        case 'E':
            className = __END_TYPE;
            break;
    }
    return className;
}
