const router = require('express').Router();
const path = require('path');

module.exports = function frontendRouter() {
  // frontend routes
  router.get('*', (req, res) => {
    res.sendFile(path.join(global.basedir, 'public', 'site.html'));
  });

  return router;
};
