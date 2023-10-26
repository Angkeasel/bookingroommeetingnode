const configs = require('../configs/auth.configs')
const jwt = require('jsonwebtoken');

// verifyJWT Function 
const verifyToken = (req, res, next) => {
    const access_token = req.headers['authorization'];
    if (!access_token) {
        return res.status(403).send({
            message: "A token is required for authentication",
        });
    }
    jwt.verify(access_token.split(" ")[1], configs.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });

        }
        req.userId = decoded.id;
        next();
    });

    // try {
    //     const decoded = jwt.verify(access_token.split(" ")[1], configs.secret);
    //     req.user = decoded;
    // } catch (e) {
    //     return res.status(401).send({
    //         message: "Unauthorization!"
    //     });
    // }
    // return next();
};

module.exports = verifyToken;
//....................