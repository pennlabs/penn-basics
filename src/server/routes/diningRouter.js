const router = require('express').Router();

export default function diningRouter(DB) {
  // router.use((req,res,next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });

  router.post('/menu_date_range', (req, res) => {
    const {
      venueId,
      startDate,
      endDate,
    } = req.body.endDate;
    console.log("****MAKING REQUEST");
    if (!venueId || !startDate || !endDate) {
      res.status(400).send("You must pass in a valid venueId, startDate, and endDate");
    }
    DB.dateRangeMenu(venueId, startDate, endDate)
      .then(meals => {
        console.log("****MEALS");
        console.log(meals);
        res.json(meals);
      })
      .catch(err => {
        console.log("****ERROR");
        res.status(500).send({ error: err.message });
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
        res.status(500).send({ error: err.message });
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
        res.status(500).send({ error: err.message });
      });
  });

  return router;
}
