const router = require('express').Router();

module.exports = function newsRouter (){
    router.post('/', (req, res) => {
        console.log("!!!");
        console.log(req.body);
    })

    return router;
}