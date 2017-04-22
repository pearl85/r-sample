var lwip = require('lwip');
var compression = require('compression');
var express = require('express');
//var https = require('https'); // incase of https image request
var http = require('http');
var bodyParser = require('body-parser');
var server = express();
var PORT = process.env.ENV_PORT;

server.use(compression());
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/image', (req, res) => {
    //var imageURL='https:'+req.query.url;
    var imageURL = 'http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-300mmf_35-56g_ed_vr/img/sample/img_01.jpg';
    http.get(imageURL, function(response) {
        var data = [];
        response.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            var buffer = Buffer.concat(data);
            lwip.open(buffer, "jpg", function(err, image) {
                var batch = image.batch();
                batch.exec(function(err, image) {
                    if (err) return console.log(err);
                    image.resize(350, 350, function(err, image) {
                        image.toBuffer("jpg", {
                            quality: 50
                        }, function(err, buffer) {
                            if (err) return console.log(err);
                            var resObj = {};
                            resObj.dataURI = "data:image/jpeg;base64," + buffer.toString('base64');
                            resObj.key = req.query.imageKey;
                            res.json(resObj);
                        });
                    });
                });
            });

        });

    });
});

server.listen(PORT, function() {
    console.log('image api server is running in', PORT);
});
