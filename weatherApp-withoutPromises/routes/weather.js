const express = require('express');
const lodash = require('lodash');
const router = express.Router();

const weather = require('../controllers/weather');
const location = require('../controllers/location')


router.post('/', (request, resp) => {
  var res;
  if (!lodash.isEmpty(request.body.place)) {
      location.geoCodeAddress(request.body.place,(error,response)=>{
        if(error){
          throw err;
        }
        else{
            weather.temperature(response.latitude,response.longitude,response.address,(error,response)=>{
              if(error){
                throw error;
              }
              else{
                resp.send(response);
              }
            })
        }
        
      })
  }
});

module.exports = router;