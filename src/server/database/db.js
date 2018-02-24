const moment = require('moment');
import mongoose from './mongoose-connect';
import Space from './models/space';

// params: none
function findAllSpaces() {
  return Space.find();
}

// params: filter object = (open: Boolean, outlets: Integer, noise: Integer, groups: Integer)
function filterSpaces(open, outletLevel, quietLevel, groupLevel) {
  if (open) {
    return Space.find({start: {$lte: hour}, end: {$gt: hour}, outlets: {$gte: outletLevel},
      quiet: {$gte: quietLevel}, groups: {$gte: groupLevel}});
  }
  return Space.find({outlets: {$gte: outletLevel}, quiet: {$gte: quietLevel}, groups: {$gte: groupLevel}});
}

// params: spaceId
function getSpace(space) {
  return Space.findOne(space);
}

// params: new space
function insertSpace(space) {
  return new Space(space).save();
}

export default {
  filterSpaces,
  getSpace,
  insertSpace,
  findAllSpaces
};