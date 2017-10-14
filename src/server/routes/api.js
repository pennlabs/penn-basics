const router = require('express').Router();

export default function apiRouter(DB){
  router.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the API!"
    });
  });

  return router;
}