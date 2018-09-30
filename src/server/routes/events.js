const router = require('express').Router();

module.exports = function eventsRouter(DB) {
  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the API!',
    });
  });

  router.get('/:date', (req, res) => {
    const datemillis = parseInt(req.params.date, 10);
    const date = new Date(datemillis);
    DB.getEvents(date)
      .then((events) => {
        res.status(200).json({
          events,
        });
      })
      .catch(console.log); //eslint-disable-line
  });

  return router;
};
