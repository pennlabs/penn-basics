const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const frontendRouter = require('./routes/frontend');
const eventsRouter = require('./routes/events');
const spacesRouter = require('./routes/spaces');
const diningRouter = require('./routes/dining');

const DB = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

global.basedir = path.join(__dirname, '..', '..');
app.use(express.static(path.join(__dirname, '..', '..', 'public')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
let lastSeededTimestamp;
app.use('/', function(req, res, next) {
  const now = new Date();
  if (!lastSeededTimestamp || lastSeededTimestamp.getDate() != now.getDate()) {
    require('./database/seedDiningInfo').fullSeed();
    lastSeededTimestamp = now;
  }
  next();
});

app.use('/api/spaces', spacesRouter(DB));
app.use('/api/events', eventsRouter(DB));
app.use('/api/dining', diningRouter(DB));
app.use('/', frontendRouter(DB));

// Seed data on server start
// TODO have other scripts to do this


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
