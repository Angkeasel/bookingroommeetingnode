const { verifySignUp, authJwt } = require('../middleware');
//const auth = require('../middleware/auth.middleware.js');
const user = require('../controller/user.controller.js');
var router = require("express").Router();
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // user route
    router.post('/signup',
        [verifySignUp.checkDuplicateEmail], user.signup);
    router.post('/login', user.signin);
    router.get('/', user.findAllUser);
    router.get("/roles", user.findAllRoles);


    app.use('/api/user', router);
}