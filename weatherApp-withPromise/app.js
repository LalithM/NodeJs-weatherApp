const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var port = process.env.port || 8000;

let weather = require('./routes/weather');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/weather',weather);

app.listen(port,()=>{
  console.log('Running on port',port);
})