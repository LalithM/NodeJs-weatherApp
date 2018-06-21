const request = require('request');
const Weather = require('../models/Weather');

var temperature = (latitude, longitude,address,callback) => {

  request({
    url: `https://api.darksky.net/forecast/{token}/${latitude},${longitude}`,
    json: true
  }, (error, result, body) => {
    if (!error && result.statusCode === 200) {
        var weather = new Weather();
        weather.address = address;
        weather.temperature = body.currently.temperature;
        weather.apparentTemperature = body.currently.apparentTemperature;
        weather.summary = body.currently.summary;
        weather.humidity = body.currently.humidity;
        weather.windSpeed = body.currently.windSpeed;
        weather.windGust = body.currently.windGust;
      callback(undefined, weather);
    }
    else {
      callback('weather api creates an error' + error);
    }
  });
};

module.exports.temperature = temperature;