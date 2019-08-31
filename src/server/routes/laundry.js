const router = require('express').Router();
const webpush = require('web-push');

module.exports = function laundryRouter() {
    router.post('/reminder', (req, res) => {
        let {subscription, time_remaining} = req.body;
        
        // time_remaining = 0 this is for test use

        setTimeout(() => {
            webpush.sendNotification(subscription, null)
                .catch(err => {
                    console.error(err)
                });
        }, Number(time_remaining) * 60 * 1000);
    });

    return router;
};