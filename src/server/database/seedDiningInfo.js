const fs = require('fs');
const async = require('async');
const _ = require('lodash');

// Import functions
const getVenueWeeklyMenu = require('./diningWrapper').getVenueWeeklyMenu;
const getAllVenues = require('./diningWrapper').getAllVenues;

// Import database models
const Venue = require('./models/Venue');
const DateHours = require('./models/DateHours');
const Meal = require('./models/Meal');

function loadVenues() {
  return getAllVenues()
    .then(venues => {
      const ids = Object.keys(venues);
      return Promise.all(ids.map(id => {
        const venue = venues[id];
        return new Venue({
          venueId: id,
          name: venue.name,
          venueType: venue.venueType,
        })
          .save()
          .then(venueObj => {
            return Promise.all(_.flatten(venue.dateHours.map((obj) => {
              const dt = new Date(obj.date);
              const date = new Date(dt.getTime() + (4 * 3600 * 1000));
              const meals = obj.meal;
              return meals.map(meal => {
                new DateHours({
                  date: date,
                  type: meal.type,
                  open: meal.open,
                  close: meal.close,
                  venueId: venueObj.id,
                }).save();
              });
            })));
          });
      }));
    });
}

function loadMealsObjIntoDB(meals) {

  const venueIds = Object.keys(meals);
  return Promise.all(_.flatten(venueIds.map(venueId => {
    // Get a single venue
    return Venue.findOne({venueId: Number(venueId)})
      .then(venue => {
        if (!venue || !meals[venueId]) return Promise.resolve();
        // Get corresponding meals object for venue
        const mealsObj = meals[venueId];
        const dates = Object.keys(mealsObj);
        return (dates.map(date => {
          const dateMealsObj = mealsObj[date];
          const types = Object.keys(dateMealsObj);
          return types.map(type => { // Type - breakfast lunch or dinner
            const mealObjects = dateMealsObj[type];
            const categories = Object.keys(mealObjects);
            return categories.map(category => {
              const items = mealObjects[category];
              const mealItems = items.map(item => {
                return {
                  title: item.title ? item.title : '',
                  description: item.description ? item.description : '',
                  tags: item.tags ? item.tags : [],
                };
              });
              return new Meal({
                date: date,
                type: type,
                category,
                venue: venue._id,
                meals: mealItems,
              }).save();
            });
          });
        }));
      });
  })));
}

function loadMeals() {
  // Populate meals object with all meals from Penn-provided API
  return new Promise((resolve, reject) => {
    const venueIdMappings = require('./venue_id_mappings');
    const venueIds = Object.keys(venueIdMappings).map(k => venueIdMappings[k]);
    const meals = {};
    async.eachSeries(venueIds, (id, callback) => {
      getVenueWeeklyMenu(id)
        .then(json => {
          console.log('DINING SEED: ', id);
          meals[id] = json;
          setTimeout(callback, 50);
        })
        .catch(() => {
          // Note that this error will come up even for venues that do not have menus
          // (in which case this error is chill)
          console.log(`Error populating menu for venue_id ${id} `);
          setTimeout(callback, 50);
        });
    }, err => {
      if (err) return reject(err);
      return resolve(meals);
    });
  })
    .then(meals => {
      return loadMealsObjIntoDB(meals);
    });
}

function deleteDiningCollections() {
  return Venue.find().remove()
    .then(() => {
      return DateHours.find().remove();
    })
    .then(() => {
      return Meal.find().remove();
    });
}

module.exports.venues_seed = loadVenues;
module.exports.meals_seed = loadMeals;
module.exports.full_seed = () => {
  // Getting venueid mappings may not be necessary on every call
  deleteDiningCollections()
    .then(() => loadVenues())
    .then(() => loadMeals())
    .then(() => console.log('COMPLETED'))
    .catch(console.log);
};
