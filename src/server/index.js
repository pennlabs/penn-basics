const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
import frontendRouter from './routes/frontend';
import apiRouter from './routes/api';
import DB from './database/db';
require('dotenv').config();

global.__basedir = path.join(__dirname, '..', '..');
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
    publicPath: config.output.publicPathdist
  }));
}

app.use('/api', apiRouter(DB));
app.use('/', frontendRouter(DB));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});