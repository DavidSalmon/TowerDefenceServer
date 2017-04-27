/**
 * Created by David Salmon on 05/04/2017.
 */
const express = require('express');
const MapController = require('../Controllers/MapController');
const fs = require('fs');

var app = express();


app.use('/:id',function (req, res, next) {
  MapController.handleGetMapRequest(req,res,next);
});

module.exports = app;
