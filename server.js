/**
 * Created by David Salmon on 05/04/2017.
 */
'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
/*app.get('/map/:id', function (req, res) {
    res.sendFile('./maps/test.html',{root: __dirname});
});*/

app.use('/maps', require('./routes/get_maps'));


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);