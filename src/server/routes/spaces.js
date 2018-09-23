const router = require('express').Router();

module.exports = function spacesRouter(DB) {
  router.get('/all', (req, res) => {
    DB.findAllSpaces().then((spaces) => {
      res.status(200).json({
        spaces,
      });
    });
  });

  router.get('/homepage', (req, res) => {
    DB.filterSpaces(true, 0, 0, 0).then((spaces) => {
      const space1 = Math.floor(Math.random() * spaces.length);
      let space2 = Math.floor(Math.random() * spaces.length);

      while (space2 !== space1) {
        space2 = Math.floor(Math.random() * spaces.length);
      }

      res.status(200).json({
        spaces: [spaces[space1], spaces[space2]],
      });
    });
  });

  router.post('/', (req, res) => {
    const space = {
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      outlets: req.body.outlets,
      quiet: req.body.quiet,
      groups: req.body.groups,
    };

    const spaceKeys = Object.keys(space);

    try {
      spaceKeys.forEach((key) => {
        if (typeof space[key] === 'undefined' || space[key] === '') {
          throw Error();
        }
      });
    } catch (err) {
      res.status(400).json({
        message: 'One or more of the parameters for a new space is undefined or empty. Check the request again.',
      });

      return;
    }

    DB.insertSpace(space).then(() => {
      res.status(200).json({
        message: 'Space successfully created.',
      });
    });
  });

  router.get('/:id', (req, res) => {
    const spaceId = req.params[0];
    DB.getSpace(spaceId).then((space) => {
      res.status(200).json({
        spaces: space,
      });
    });
  });

  return router;
};
