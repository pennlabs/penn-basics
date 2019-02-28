const spaces = require('../resources/spaces.json');
const Space = require('./models/space');

function deleteSpacesInDB() {
  return Space.find().remove();
}

function loadSpacesIntoDB() {
  return Promise.all(spaces.map(space => (
    new Space(space)
      .save()
      .then(console.log) // eslint-disable-line
  )));
}

deleteSpacesInDB().then(loadSpacesIntoDB).then(() => process.exit(0));
