
const db = require('../models');
const User = db.user;

// check deplicate email
checkDuplicateEmail = async (req, res, next) => {
    try {
        const emailExist = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (emailExist) {
            res.status(400).send({
                message: "Email already exist",
            });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }

};
const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};
module.exports = verifySignUp;

