const express = require('express');
const app = express();
const axios = require('axios');
var bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "Content-Type");
    next();
});
app.use('/www', express.static(path.join(__dirname, 'www')));

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

if (process.env.ENV_API_PORT !== undefined) {
    const PORT = process.env.ENV_API_PORT;
    app.listen(PORT, function() {
        console.log(`UI Page is listening on port ${PORT}!`);
    });
}
