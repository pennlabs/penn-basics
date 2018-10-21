const spaces = require('../resources/spaces.json');
const Space = require('./models/Space');

function deleteSpacesInDB() {
  return Space.find().remove();
}

function loadSpacesIntoDB() {
  spaces.map(space => (
    new Space(space)
      .save()
      .then(console.log) // eslint-disable-line
  ));
}

deleteSpacesInDB().then(loadSpacesIntoDB);
