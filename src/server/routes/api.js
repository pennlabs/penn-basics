const fs = require('fs');
const router = require('express').Router();
const EVENT_LIST = JSON.parse(fs.readFileSync(__basedir + '/src/server/resources/events.json'));

export default function apiRouter(DB){
  router.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the API!"
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

  return router;
}