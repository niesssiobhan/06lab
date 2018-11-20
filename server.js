'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.get('/location', (request, response) => {
  console.log(request.query.data, 'is the query that came from the search field in the browser.');
  const locationData = searchToLatLong(request.query.data);
  console.log(locationData);
  response.send(locationData);
})

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query;
  return location;
}


function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitdue = data.geometry.location.lng;
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`));
