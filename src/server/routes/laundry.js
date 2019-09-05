const router = require('express').Router();
const webpush = require('web-push');

const timeouts = [];

module.exports = function laundryRouter() {
    router.post('/addReminder', (req, res) => {
        let { subscription, time_remaining } = req.body;

        time_remaining = 5000
        // time_remaining = Number(time_remaining) * 60 * 1000

        const timeout = setTimeout(() => {
            webpush.sendNotification(subscription, null)
                .catch(err => {
                    console.error(err);
                });
            res.json({})
            console.log("----Web Push: notification pushed----");
        }, time_remaining);

        timeouts.push(timeout);
    });

    router.post('/removeReminder', (req, res) => {
        timeouts.forEach(timeout => clearTimeout(timeout));
        res.json({});
    })

    return router;
};