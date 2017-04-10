/**
 * Created by David Salmon on 05/04/2017.
 */
const express = require('express');
const MapJSON = require('../Entities/MapJSON');
const MapCase = require('../Entities/MapCase');
const MapController = require('../Controllers/MapController');
const MapFileDataHelper = require('../Helper/MapFileDataHelper');
const fs = require('fs');

var app = express();


app.use('/:id',function (req, res, next) {
  MapController.handleGetMapRequest(req,res,next);
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
