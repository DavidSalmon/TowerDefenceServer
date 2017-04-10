/**
* Created by David Salmon on 07/04/2017.
*/
const MapCase = require('../Entities/MapCase');


const __BEGIN_CLASS = 'begin';
const __END_CLASS = 'end';
const __PATH_CLASS = 'path';
const __STONE_CLASS = 'stone';




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
        cases[currentline].push(new MapCase(lineNumber,currentline,getHTMLClassChar(character)));
        if(character === 'B')
        spawnCase = new MapCase(lineNumber,currentline,getHTMLClassChar(character));
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
  if((previousCase === null ||!(previousCase.y===y && previousCase.x===x))
  &&(cases[y][x].type === 'path' || cases[y][x].type=== 'end'))
  return new MapCase(x,y,cases[y][x].type);
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
