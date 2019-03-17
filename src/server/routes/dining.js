const router = require('express').Router();

module.exports = function diningRouter(DB) {
  router.post('/menu_date_range', (req, res) => {
    const {
      venueId,
      startDate,
      endDate,
    } = req.body;

    if (!venueId || !startDate || !endDate) {
      console.log('INVALID FORMAT'); //eslint-disable-line

      res.status(400).send('You must pass in a valid venueId, startDate, and endDate');

      return;
    }

    DB.dateRangeMenu(venueId, startDate, endDate)
      .then(meals => res.json(meals))
      .catch(err => res.status(500).send({ error: err.message }));
  });

  router.post('/daily_menu', (req, res) => {
    const venueId = Number(req.body.venueId);
    const { date } = req.body;

    DB.getVenueMenuForDate(venueId, date)
      .then((meals) => {
        res.json(meals);
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  });

  router.post('/venue_info', (req, res) => {
    const venueId = Number(req.body.venueId);
    const { startDate, endDate } = req.body;

    DB.venueInfo(venueId, startDate, endDate)
      .then((venueInfo) => {
        const { venue, hours } = venueInfo;
        const processedHours = hours.map(hour => ({
          date: hour.date,
          type: hour.type,
          open: hour.open,
          close: hour.close,
        })).sort((a, b) => a.date.getTime() - b.date.getTime());
        res.json({
          hours: processedHours,
          venue,
        });
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  });

  return router;
};
