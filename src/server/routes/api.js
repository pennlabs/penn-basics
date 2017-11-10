const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const EVENT_LIST = require('../resources/events');

export default function apiRouter(DB){
  router.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the API!",
    });
  });

  // POST /events
  // Parameters: 'start' date as integer 
  // Output: events that 'start' date lies between
  router.post('/events', (req, res) => {
    const start = req.body.start;

    let events = [];
    EVENT_LIST.forEach(event => {
      if (start >= Date.parse(event.start) && start <= Date.parse(event.end)) {
        events.push(event);
      }
    });
    
    res.status(200).json({
      events
    });
  });

  // POST /spaces
  router.post('/spaces', (req, res) => {
    res.status(200).json({
      message: "Just study where u can",
    })
  });

  return router;
}