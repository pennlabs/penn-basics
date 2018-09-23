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
  const retObject = _.groupBy(meals, 'date');
  const dates = Object.keys(retObject);
  dates.forEach((date) => {
    retObject[date] = _.groupBy(retObject[date], 'type');
    const types = Object.keys(retObject[date]);
    types.forEach((type) => {
      retObject[date][type] = _.groupBy(retObject[date][type], 'category');
      const categories = Object.keys(retObject[date][type]);
      categories.forEach((category) => {
        const [first] = retObject[date][type][category];
        retObject[date][type][category] = first;

        if (retObject[date][type][category]) {
          retObject[date][type][category] = retObject[date][type][category].meals;
        }
      });
    });
  });

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
