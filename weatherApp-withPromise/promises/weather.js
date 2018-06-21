const axios = require('axios');
const Weather = require('../models/Weather');



let geoLocation = (address) => {
  let geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
  return axios.get(geoUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the address');
    }
    else if (response.data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('Query limit exhausted');
    }
    var longitude = response.data.results[0].geometry.location.lng;
    var latitude = response.data.results[0].geometry.location.lat;
    var address = response.data.results[0].formatted_address;

    let weatherUrl = `https://api.darksky.net/forecast/{token}/${latitude},${longitude}`;

    return axios.get(weatherUrl);
  })
    .then((response) => {
      var weather = new Weather();
      weather.address = address;
      weather.temperature = response.data.currently.temperature;
      weather.apparentTemperature = response.data.currently.apparentTemperature;
      weather.summary = response.data.currently.summary;
      weather.humidity = response.data.currently.humidity;
      weather.windSpeed = response.data.currently.windSpeed;
      weather.windGust = response.data.currently.windGust;
      return weather;
    })
    .catch((error) => {
      if (error === 'ENOTFOUND') {
        console.log('No resource found');
      }
      else {
        console.log(error);
      }
    })
};

module.exports.geoLocation = geoLocation;