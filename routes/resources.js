/**
 * Created by David Salmon on 25/04/2017.
 */
const express = require('express');
const ResourcesController = require('../Controllers/ResourcesController');

var app = express();


app.use('/textures',function (req, res, next) {
    res.setHeader('Content-Type', 'text/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ResourcesController.handleGetTexturesRequest(req,res,next);
});

app.use('/characters', function (req,res,next) {
    res.setHeader('Content-Type', 'text/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ResourcesController.handleGetCharactersRequest(req,res,next);
});

app.use('/monsters',function (req,res,next) {
    res.setHeader('Content-Type', 'text/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ResourcesController.handleGetMonstersRequest(req,res,next);
});

module.exports = app;