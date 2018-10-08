const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../client/build')));

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type, Authorization");
    next();
});

app.use('/api', api);
app.listen(8080, () => console.log('Listening on port 8080!'));
