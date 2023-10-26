const db = require('../models');
const configs = require('../configs/auth.configs.js');
const User = db.user;
const Op = db.Sequelize.Op;
// const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// dotenv.config();

// 1 create user
exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        // password: hashPassword
    }).then(userdata => {
        const tokens = jwt.sign({
            id: userdata.id,
        }, configs.secret, {
            expiresIn: 86400, // 24 hours
        });
        return res.status(200).send({
            id: userdata.id,
            username: userdata.username,
            email: userdata.email,
            accessToken: tokens

        })
    }).catch(err => {
        res.status(500).send({
            message: err.message,
        });
    });
};
// 2 verify user
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(403).send({
                message: "User Not found.",
            });

        }
        const token = jwt.sign({ id: user.id }, configs.secret, {
            expiresIn: 86400,
        });
        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token

        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
        });
    });
}
// get user all
exports.findAll = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email',]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status.send({
            message: err.message
        });
    });

}