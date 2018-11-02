require('./mongoose-connect');

// Dining Imports
const _ = require('lodash');
const Space = require('./models/Space');
const Event = require('./models/Event');
const Venue = require('./models/Venue');
const Meal = require('./models/Meal');
const DateHours = require('./models/DateHours');

// SPACES DATABASE FUNCTIONS

// params: none
function findAllSpaces() {
  return Space.find();
}

// params: filter =
// (open: Boolean, outlets: Integer, noise: Integer, groups: Integer, hour: integer)

function filterSpaces(open, outletLevel, quietLevel, groupLevel, hour) {
  if (open) {
    return Space.find({
      start: { $lte: hour },
      end: { $gt: hour },
      outlets: { $gte: outletLevel },
      quiet: { $gte: quietLevel },
      groups: { $gte: groupLevel },
    });
  }

  return Space.find({
    outlets: { $gte: outletLevel },
    quiet: { $gte: quietLevel },
    groups: { $gte: groupLevel },
  });
}

// params: spaceId
function getSpace(space) {
  return Space.findOne(space);
}

// params: new space
function insertSpace(space) {
  return new Space(space).save();
}

// DINING API FUNCTIONS

function venueInfo(venueId, startDate, endDate) {
  return Venue.findOne({ venueId })
    .then(venue => DateHours.find({
      venueId: venue.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .then(hours => ({
        hours,
        venue,
      })));
}

function getVenueMenuForDate(venueId, date) {
  return Venue.findOne({ venueId })
    .then((venue) => {
      if (!venue) {
        throw Error('Venue not found');
      }

      return Meal.find({ venue: venue.id, date });
    });
}

function formatMealsObject(meals) {
  const tempObject = _.groupBy(meals, 'date');
  const dates = Object.keys(tempObject);
  dates.forEach((date) => {
    tempObject[date] = _.groupBy(tempObject[date], 'type');
    const types = Object.keys(tempObject[date]);
    types.forEach((type) => {
      tempObject[date][type] = _.groupBy(tempObject[date][type], 'category');
      const categories = Object.keys(tempObject[date][type]);
      categories.forEach((category) => {
        const [first] = tempObject[date][type][category];
        tempObject[date][type][category] = first;

        if (tempObject[date][type][category]) {
          tempObject[date][type][category] = tempObject[date][type][category].meals;
        }
      });
    });
  });

  // Turn dates from  "Fri Nov 02 2018 00:00:00 GMT-0400 (Eastern Daylight Time)" into "Nov 02"
  const retObject = {};
  const dateStamps = Object.keys(tempObject);
  for (let i = 0; i < dateStamps.length; i += 1) {
    const dateStamp = dateStamps[i];
    const dateStampTrunc = dateStamp.substring(4, 10);
    retObject[dateStampTrunc] = tempObject[dateStamp];
  }
  return retObject;
}

function dateRangeMenu(venueId, startDate, endDate) {
  return Venue.findOne({ venueId })
    .then((venue) => {
      if (!venue) {
        return null;
      }
      return Meal.find({
        venue: venue.id,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
        .then(meals => formatMealsObject(meals));
    })
    .catch(console.log); //eslint-disable-line
}

// Events Functions

function getEvents(date) {
  return Event.find({
    start: {
      $lte: date,
    },
    end: {
      $gte: date,
    },
  });
}


module.exports = {
  // Spaces functions
  filterSpaces,
  getSpace,
  insertSpace,
  findAllSpaces,

  // Dining functions
  getVenueMenuForDate,
  dateRangeMenu,
  venueInfo,

  // Event Functions
  getEvents,
};
