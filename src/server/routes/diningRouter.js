const router = require('express').Router();

export default function diningRouter(DB) {
  // router.use((req,res,next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });

  router.post('/menu_date_range', (req, res) => {
    const venueId = req.body.venueId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    DB.dateRangeMenu(venueId, startDate, endDate)
      .then(meals => {
        res.json(meals);
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  });

  router.post('/daily_menu', (req, res) => {
    const venueId = Number(req.body.venueId);
    const date = req.body.date;
    DB.getVenueMenuForDate(venueId, date)
      .then(meals => {
        res.json(meals);
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  });

  router.post('/venue_hours', (req, res) => {
    const venueId = Number(req.body.venueId);
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    DB.venueHours(venueId, startDate, endDate)
      .then(hours => {
        res.json(hours.map(hour => {
          return {
            date: hour.date,
            type: hour.type,
            open: hour.open,
            close: hour.close,
          };
        }));
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  });

  return router;
}
