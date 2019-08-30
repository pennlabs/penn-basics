const router = require('express').Router();

module.exports = function laundryRouter(DB) {
    router.get('/reminder', (req, res) => {
        DB.findAllSpaces().then((spaces) => {
            res.status(200).json({
                spaces,
            });
        });
    });

    return router;
};