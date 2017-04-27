/**
 * Created by David Salmon on 05/04/2017.
 */
'use strict';

const express = require('express');

// Constants
const PORT = 4201;

// App
const app = express();

app.use('/maps', require('./routes/maps'));
app.use('/resources',require('./routes/resources'));
app.use('/sprites',express.static('sprites'));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
