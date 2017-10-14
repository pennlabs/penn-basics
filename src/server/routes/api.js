const router = require('express').Router();
const fs = require('fs');

export default function apiRouter(DB){
  router.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the API!"
    });
  });

  router.post('/events', (req, res) => {
    const eventList = JSON.parse(fs.readFileSync(__basedir + '/src/server/resources/events.json'));
    const start = req.body.start;
    const end = req.body.end;

    let events = [];
    eventList.forEach(event => {
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