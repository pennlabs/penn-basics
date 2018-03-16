const axios = require('axios')
const fs = require('fs')

function processStation(stations) {
  if(!stations) return {}
  const stationsObj = {};
  stations.forEach(station => {
    const stationName = station.txtStationDescription;
    stationsObj[stationName] = station.tblItem.map(item => {
      const temp = {
        title: item.txtTitle,
        description: item.txtDescription
      }
      const attribute = item.tblAttributes.txtAttribute
      temp["tags"] = [];
      if(!attribute){
        return temp
      } else if(Array.isArray(attribute)){
        item.tblAttributes.txtAttribute.forEach(attr => {
          temp["tags"].push(attr.description)
        })
      } else {
        temp["tags"].push(attribute["description"])
      }
      return temp
    })
  })
  return stationsObj;
}

function refactorVenues(venueObj) {
  const retObj = {};
  venueObj.forEach(({id,dateHours, venueType, name}) => {
    retObj[id] = {
      venueType,
      dateHours,
      name
    }
  })
  return retObj
}

//get the shit for kings court

module.exports.getVenueWeeklyMenu = function(venueId){
  return axios.get(`https://api.pennlabs.org/dining/weekly_menu/${venueId}`)
  .then(res => {
    const data = res.data.Document;
    const location = data.location;
    const day_menus = data.tblMenu;
    const menus = {};
    day_menus.forEach(day => {
      meal_times = {};
      if(day.tblDayPart){
        day.tblDayPart.forEach(meal_time => {
          const time = meal_time.txtDayPartDescription;
          meal_times[time] = processStation(meal_time.tblStation);
        })
      }
      menus[day.menudate] = meal_times;
    })
    return menus
  })
}

function getAllVenues() {
  return axios.get('https://api.pennlabs.org/dining/venues')
  .then(res => {
    let venues = res.data.document.venue;
    return refactorVenues(venues);
  })
}

module.exports.getAllVenues = getAllVenues;

module.exports.getVenueInformation = function(venueId){
  return getAllVenues()
  .then(venues => {
    return venues[venueId]
  })
}

//might only need to run this once per day
module.exports.getVenueIdMappings = function(){
  return axios.get('https://api.pennlabs.org/dining/venues')
  .then(res => {
    const venuesData = res.data.document.venue;
    const venues = {}
    venuesData.forEach(venue => {
      venues[venue.name] = venue.id
    })
    return venues
  })
  .then(mappings => {
    const json = JSON.stringify(mappings, null, '\t');
    return new Promise((res, rej) => {
      fs.writeFile('venue_id_mappings.json', json, () => {
        res(true)
      });
    })
  })
}
