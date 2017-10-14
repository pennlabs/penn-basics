const express = require('express');
const app = express();
const path = require('path');
import frontendRouter from './routes/frontend';
import apiRouter from './routes/api';
import DB from './database/db';
require('dotenv').config();

global.__basedir = path.join(__dirname, '..', '..');

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use('/api', apiRouter(DB));
app.use('/', frontendRouter(DB));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});