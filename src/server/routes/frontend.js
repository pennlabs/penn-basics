const router = require('express').Router();
const path = require('path');

module.exports = function frontendRouter(DB) {
  // frontend routes
  router.get('*', (req, res) => {
    res.sendFile(path.join(__basedir, 'public', 'site.html'));
  });

  return router;
}
