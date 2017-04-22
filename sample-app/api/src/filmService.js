const fs = require('fs');
const path = require('path');

exports.getFilmsList=function() {
	var fileName='../assets/data/films.json';
    const filePath = path.join(__dirname, fileName)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

exports.getFilmDetails=function() {
	var fileName='../assets/data/film.json';
    const filePath = path.join(__dirname, fileName)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}