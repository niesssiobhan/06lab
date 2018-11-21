'use strict';

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/location', (request, response) => {
  searchToLatLong(request.query.data)
    .then((location) => response.send(location))
    .catch((error) => handleError(error, response));
});

function searchToLatLong(query) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API__KEY}`

  return superagent.get(url)  //this is our proxy
  .then((res) => {
    // console.log(res.body.results[0]);
    return new Location(query, res.body.results[0]);
  })
  .catch((error, res) => handleError(error, res));
}

//Error handler
function handleError(error, res) {
  console.error(error);
  if (res) res.status(500).send('sorry something broke');
}

//Models
function Location(query, data) {
  this.search_query = query;
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
  console.log(this);
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`));
