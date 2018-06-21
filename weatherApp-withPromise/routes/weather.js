const express = require('express');
const lodash = require('lodash');
const router = express.Router();

const geo = require('../promises/weather');


router.post('/', (request, resp) => {
  var res;
  if (!lodash.isEmpty(request.body.place)) {
    geo.geoLocation(request.body.place).then((response) => {
      resp.send(response);
    })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = router;