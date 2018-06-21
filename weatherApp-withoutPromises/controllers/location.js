const request = require('request');

var geocodeAddress = (address,callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback('Creates an error'+error );
    }
    else if(body.status === 'ZERO_RESULTS'){
     callback('No results matched for the input given');
    }
    else if(body.status === 'OK'){
      callback(undefined,{
        address : body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });
    }
  }); 
};

module.exports.geoCodeAddress = geocodeAddress;