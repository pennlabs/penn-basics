const axios = require('axios');
const fs = require('fs');

function processStation(stations) {
  if (!stations) return {};

  const stationsObj = {};

  stations.forEach((station) => {
    const stationName = station.txtStationDescription;

    stationsObj[stationName] = station.tblItem.map((item) => {
      const temp = {
        title: item.txtTitle,
        description: item.txtDescription,
      };

      const attribute = item.tblAttributes.txtAttribute;
      temp.tags = [];

      if (!attribute) {
        return temp;
      } if (Array.isArray(attribute)) {
        item.tblAttributes.txtAttribute.forEach((attr) => {
          temp.tags.push(attr.description);
        });
      } else {
        temp.tags.push(attribute.description);
      }

      return temp;
    });
  });

  return stationsObj;
}

function refactorVenues(venueObj) {
  const retObj = {};
  venueObj.forEach(({
    id, dateHours, venueType, name,
  }) => {
    retObj[id] = {
      venueType,
      dateHours,
      name,
    };
  });

  return retObj;
}

module.exports.getVenueWeeklyMenu = venueId => (
  axios.get(`https://api.pennlabs.org/dining/weekly_menu/${venueId}`)
    .then((res) => {
      const data = res.data.Document;
      const dayMenus = data.tblMenu;

      // Populate the list of menus
      const menus = {};
      dayMenus.forEach((day) => {
        const mealTimes = {};
        if (day.tblDayPart) {
          day.tblDayPart.forEach((mealTime) => {
            const time = mealTime.txtDayPartDescription;

            console.log(mealTime.tblStation); // eslint-disable-line

            mealTimes[time] = processStation(mealTime.tblStation);
          });
        }
        menus[day.menudate] = mealTimes;
      });
      return menus;
    })
    .catch(() => null)
);

function getAllVenues() {
  return axios.get('https://api.pennlabs.org/dining/venues')
    .then((res) => {
      const venues = res.data.document.venue;
      return refactorVenues(venues);
    })
    .catch(console.log); //eslint-disable-line
}

module.exports.getAllVenues = getAllVenues;

module.exports.getVenueInformation = venueId => (
  getAllVenues()
    .then(venues => venues[venueId])
);

// Might only need to run this once per day
module.exports.getVenueIdMappings = () => (
  axios.get('https://api.pennlabs.org/dining/venues')
    .then((res) => {
      const venuesData = res.data.document.venue;
      const venues = {};
      // Create mapping from venue name to id
      venuesData.forEach((venue) => {
        venues[venue.name] = venue.id;
      });
      return venues;
    })
    .then((mappings) => {
      const json = JSON.stringify(mappings, null, '\t');
      return new Promise((res) => {
        fs.writeFile('venue_id_mappings.json', json, () => {
          res(true);
        });
      });
    })
    .catch(() => null)
);
