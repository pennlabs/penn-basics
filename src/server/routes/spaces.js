const moment = require('moment');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const SPACE_LIST = require('../resources/spaces');

export default function spacesRouter(DB){
  router.get('/:id', (req, res) => {
    const space = req.params[0];
    for (let i = 0; i < SPACE_LIST.length; i++) {
      if (SPACE_LIST[i].id == space) {
        res.status(200).json({
          space: SPACE_LIST[i]
        });
      } 
    }
  });

  router.get('/all/:num_spaces', (req, res) => {
    const num_spaces = parseInt(req.params[0]);
    res.status(200).json({
      spaces: SPACE_LIST.splice(0, num_spaces)
    });
  });

  router.get('/homepage', (req, res) => {
    let spaces = [];
    for (let i = 0; i < SPACE_LIST.length; i++) {
      const open = SPACE_LIST[i].open_hours;
      const close = SPACE_LIST[i].close_hours;
      if (moment().isBetween(open[moment().day()], close[moment().day()])) {
        spaces.push(SPACE_LIST[i]);
      }

      res.status(200).json({
        spaces
      });
    }
  });

  return router;
}