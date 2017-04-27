/**
 * Created by David Salmon on 25/04/2017.
 */
const resources = require('../resources');
const spriteMock = require('../mock/sprite-mock')
module.exports ={
    handleGetTexturesRequest : function(req,res,next){
        res.json(spriteMock.textures);
        next();
    },
    handleGetCharactersRequest : function (req,res,next) {
        console.log('handleGetCharactersRequest')
        res.json(spriteMock.characters);
    },

    handleGetMonstersRequest : function (req,res,next) {
        console.log('handleGetMonstersRequest')
        res.json(spriteMock.monsters);
    },
}