const express = require('express');
const app = express();
const axios = require('axios');
var bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
var svcFilms = require('./src/filmService');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "Content-Type");
    next();
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/films', function(req, res) {
    res.send(svcFilms.getFilmsList());
});

app.get('/film', function(req, res) {
    res.send(svcFilms.getFilmDetails());
});

exports.appAPI=app;
exports.appMethods=svcFilms;
if (process.env.ENV_API_PORT !== undefined) {
    const PORT = process.env.ENV_API_PORT;
    app.listen(PORT, function() {
        console.log(`Application listening on port ${PORT}!`);
    });
}
