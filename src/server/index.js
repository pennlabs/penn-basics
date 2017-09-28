const express = require('express');
const app = express();
import frontendRouter from './routes/frontend';
import apiRouter from './routes/api';
import DB from './database/db';

app.use('/api', apiRouter(DB));
app.use('/', frontendRouter(DB));

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});