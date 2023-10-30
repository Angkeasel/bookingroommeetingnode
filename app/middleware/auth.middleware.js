const configs = require('../configs/auth.configs')
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

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
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.roleId).then(role => {

            if (role.name === "admin") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};
// isAdmin = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId);
//         const roles = await user.getRoles();

//         for (let i = 0; i < roles.lenght; i++) {
//             if (roles[i].name === 'admin') {
//                 return next();
//             }
//         }
//         return res.status(403).send({
//             message: "Require Admin Role!",
//         });
//     } catch (err) {
//         return res.status(500).send({
//             status: 'Fail',
//             message: 'Unable to validate User role!'
//         })
//     }
// }
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
module.exports = authJwt;
//....................