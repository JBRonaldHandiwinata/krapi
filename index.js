
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

//API exposed
const postRoutes = require('./routes/posts-routes');
const catRoutes = require('./routes/categories-routes');
const authRoutes = require('./routes/auth-routes');

//API construct
const app = express();

// app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json({
    limit: '50mb',
    extended: true
}));

//URI exposed
app.use('/v1', postRoutes.routes);
app.use('/v1', catRoutes.routes);
app.use('/v1', authRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url: ' + config.url));