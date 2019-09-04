const router = require('express').Router();
const webpush = require('web-push');

module.exports = function laundryRouter() {
    router.post('/reminder', (req, res) => {
        let { subscription, time_remaining } = req.body;

        time_remaining = 10000
        // time_remaining = Number(time_remaining) * 60 * 1000

        setTimeout(() => {
            webpush.sendNotification(subscription, null)
                .catch(err => {
                    console.error(err);
                });
            console.log("----Web Push: notification pushed----");
        }, time_remaining);
    });

    router

    return router;
};