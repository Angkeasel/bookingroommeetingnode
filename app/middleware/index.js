const verifySignUp = require('./verifySignup.js');
const authJwt = require('./auth.middleware.js');
module.exports = {
    verifySignUp,
    authJwt
};