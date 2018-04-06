const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const EVENT_LIST = require('../resources/events');

import diningApi from './diningRouter';

export default function apiRouter(DB) {
  router.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the API!",
    });
  });

  router.get('/events/:date', (req, res) => {
    const date = parseInt(req.params.date, 10);

    const events = [];
    EVENT_LIST.forEach(event => {
      if (date >= Date.parse(event.start) && date <= Date.parse(event.end)) {
        events.push(event);
      }
    });

    res.status(200).json({
      events
    });
  });

  router.use('/dining', diningApi(DB));

  return router;
}
