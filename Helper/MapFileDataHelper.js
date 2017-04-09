/**
 * Created by David Salmon on 07/04/2017.
 */
const MapCase = require('../Entities/MapCase');


const __BEGIN_CLASS = 'begin';
const __END_CLASS = 'end';
const __PATH_CLASS = 'path';
const __STONE_CLASS = 'stone';


class MapFileDataHelper{
    constructor(data){
        this.data = data;
    }


    extractCasesFromFileData(){
        let cases = [];
        let lines = this.data.replace(new RegExp('\r', 'g'),'').split('\n');
        let spawnCase = null;
        for(let line of lines){
            cases.push([]);
            let currentline = cases.length -1;
            let lineNumber = 0;
            for(let character of line){
                cases[currentline].push(new MapCase(lineNumber,currentline,this.getHTMLClassChar(character)));
                if(character === 'B')
                    spawnCase = new MapCase(lineNumber,currentline,this.getHTMLClassChar(character));
                lineNumber++;
            }
        }

        return {cases : cases, spawnCase : spawnCase};
    }



    getHTMLClassChar(caseType){
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
}

module.exports = MapFileDataHelper;