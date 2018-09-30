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

global.__basedir = path.join(__dirname, '..', '..'); // eslint-disable-line
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require(path.join(__basedir, 'webpack.config.js'));
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist,
  }));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/spaces', spacesRouter(DB));
app.use('/api/events', eventsRouter(DB));
app.use('/api/dining', diningRouter(DB));
app.use('/', frontendRouter(DB));

// Seed Dining Data on Server Start
// require('./database/seedDiningInfo').full_seed();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
