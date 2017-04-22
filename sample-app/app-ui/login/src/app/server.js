import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import LOGIN from './components/login/login';
import template from './index';;
import compression from 'compression';
import serverAPI from 'api';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import morgan from 'morgan';

const NodeCache = require("node-cache");
const nCache = new NodeCache();
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const server = serverAPI.appAPI;
const svcFilms = serverAPI.appMethods;
const PORT = process.env.ENV_PORT;
const IMAGEAPI_PORT = process.env.ENV_IMAGE_API_PORT;
const IMAGEAPI_HOST = "http://localhost";
const IMAGEAPI = IMAGEAPI_HOST+":"+IMAGEAPI_PORT;

server.use(compression());
server.use(responseTime());
server.use('/assets', express.static(path.join(__dirname, 'assets')));
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

var accessLogStream = fs.createWriteStream(__dirname + '/access.log',{flags: 'a'});
server.use(morgan('combined', {stream: accessLogStream}));

var cssContent = "";
var manifestContent="";

server.get('/starwars', (req, res) => {
    var results = svcFilms.getFilmDetails();
    console.log("sd"+results);
    results.inlineImageData="InlineImageNotAvailable";
    nCache.get(results.filmId, function(err, value) {
        if (!err) {
            if (value == undefined) {
                axios.get(IMAGEAPI+'/image?imageKey='+results.filmId+'&url='+results.filmUrl)
                    .then(function(imageResponse) {
                       nCache.set(imageResponse.data.key, imageResponse.data.dataURI, 10000);
                    });
            } else {
                results.inlineImageData=value;
            }

            const initialState = { results };
            const appString = renderToString(<LOGIN {...initialState }/>);
            res.send(template({
                body: appString,
                title: "StarWars",
                initialState: JSON.stringify(initialState),
                styles: cssContent,
                manifestContent:JSON.stringify(manifestContent)
            }));

        }
    });    
});

server.get('*', function(req, res) {
    return res.redirect(301, 'http://' + req.headers.host + '/films'); //}
});

server.listen(PORT, function() {
    const manifestFilePath = path.join(__dirname, '../../dist/assets/manifest.json');
    manifestContent = JSON.parse(fs.readFileSync(manifestFilePath, 'utf8'));
    //manifestContent=JSON.stringify(manifestContent);
    console.log(manifestContent);
    const filePath = path.join(__dirname, '../../dist/assets/'+manifestContent['client_bundle.css']);
    console.log(filePath);
	cssContent = fs.readFileSync(filePath, 'utf8');
	
    console.log('server running in', PORT);
});