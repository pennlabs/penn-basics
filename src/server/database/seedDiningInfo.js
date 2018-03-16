const fs = require('fs')
const async = require('async')
const getVenueIdMappings = require('./DiningWrapper').getVenueIdMappings
const getVenueWeeklyMenu = require('./DiningWrapper').getVenueWeeklyMenu
const getVenueInformation = require('./DiningWrapper').getVenueInformation
const getAllVenues = require('./DiningWrapper').getAllVenues;

const Venue = require('./models/Venue')
const DateHours = require('./models/DateHours')
const Meal = require('./models/Meal')

const _ = require('lodash')


function loadVenues() {
  return getAllVenues()
  .then((venues) => {
    const ids = Object.keys(venues);
    return Promise.all(ids.map(id => {
      const venue = venues[id]
      return new Venue({
        venueId: id, //figure out what the fuck the id is
        name: venue.name,
        venueType: venue.venueType
      })
      .save()
      .then(venueObj => {
        return Promise.all(_.flatten(venue.dateHours.map((obj) => {
          const date = obj.date
          const meals = obj.meal
          return meals.map(meal => {
            new DateHours({
              date: new Date(date),
              type: meal.type, 
              open: meal.open,
              close: meal.close,
              venueId: venueObj.id
            }).save()
          })
        })))
      })
    }))
  })
}

function loadMealsObjIntoDB (meals) {
  const venueIds = Object.keys(meals)
  return Promise.all(_.flatten(venueIds.map(venueId => {
    //get a single venue
    return Venue.findOne({venueId : Number(venueId)})
    .then(venue => {
      if (!venue) {
        return Promise.resolve()
      }
      //get corresponding meals object for venue
      const mealsObj = meals[venueId]
      const dates = Object.keys(mealsObj)
      return (dates.map(date => {
        let dateMealsObj = mealsObj[date]
        const types = Object.keys(dateMealsObj)
        return types.map(type => { //type - breakfast lunch or dinner
          const mealObjects = dateMealsObj[type]
          const categories = Object.keys(mealObjects)
          return categories.map(category => {
            const items = mealObjects[category]
            const mealItems = items.map(item => {
              return {
                title: item.title ? item.title : '',
                description: item.description ? item.description : '',
                tags: item.tags ? item.tags : []
              }
            })
            return new Meal({
              date: date,
              type: type,
              category,
              venue: venue._id,
              meals: mealItems
            }).save()
          })
        })
      }))
    })
  })))
}

function loadMeals(){
  //populate meals object with all meals from Penn-provided API
  return new Promise((resolve,reject) => {
    const venueIdMappings = require('../venue_id_mappings');
    const venueIds = Object.keys(venueIdMappings).map(k => venueIdMappings[k])
    const meals = {} 
    async.eachSeries(venueIds, function(id, callback) {
      getVenueWeeklyMenu(id)
      .then(json => {
        console.log(id)
        meals[id] = json
        setTimeout(callback,50)
      })
      .catch(err => {
        //Note that this error will come up even for venues that do not have menus (in which case this error is chill)
        console.log(`Error populating menu for venue_id ${id} `)
        setTimeout(callback,50)
      })
    }, function(err) {
      if (err) {
        return reject(err)
      }
      resolve(meals)
    });
  })
  .then(meals => {
    return loadMealsObjIntoDB(meals)
  })
}


module.exports.venues_seed = loadVenues;

module.exports.meals_seed = loadMeals;

module.exports.full_seed = function() {
  //getting venueid mappings may not be necessary on every call
  loadVenues()  
  .then(() => {
    return loadMeals()
  })
  .then(() => {
    console.log('COMPLETED')
  })
  .catch(console.log)
  
}

