const db = require('../models');
const configs = require('../configs/auth.configs.js');
const User = db.user;
const Role = db.roles;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// dotenv.config();

// 1 create user
exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: req.body.roleId
    }).then(userdata => {
        console.log(`========>hello would ${userdata.id}`);
        const tokens = jwt.sign({
            id: userdata.id,
        }, configs.secret, {
            expiresIn: 86400, // 24 hours
        });
        // if (req.body.roles) {
        //     const roles = Role.findAll({
        //         where: {
        //             name: {
        //                 [Op.or]: req.body.roles
        //             }

        //         }
        //     });
        //     const result = userdata.setRoles(roles);
        //     if (result) {
        //         res.send({
        //             message: "User registered successfully!",
        //         });
        //     } else {
        //         const result = userdata.setRoles([1]);
        //         if (result) {
        //             res.send({
        //                 message: "User registered successfully!",
        //             })
        //         }
        //     }
        // }
        Role.findByPk(userdata.roleId).then(role => {
            console.log(`=========>find role id ${role.name}`);
            res.status(200).send({
                id: userdata.id,
                username: userdata.username,
                email: userdata.email,
                roles: role.name?.toUpperCase(),
                accessToken: tokens

            });
        });

    }).catch(err => {
        res.status(500).send({
            message: err.message,
        });
    });
};
// 2 verify user
exports.signin = (req, res) => {
    try {
        User.findOne({
            where: {
                username: req.body.username,
                email: req.body.email,
            }
        }).then(user => {
            if (!user) {
                return res.status(403).send({
                    message: "User Not Found.",
                });

            };
            const isInvalidPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!isInvalidPassword) {
                return res.status(403).send({
                    message: "Wrong Password!",
                    accessToken: null
                })
            };
            const token = jwt.sign({ id: user.id }, configs.secret, {
                expiresIn: 86400,
            });
            // let authorities = [];
            // const roles = user.getRoles();
            // for (let i = 0; i < roles.length; i++) {
            //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
            // }
            // req.session.token = token;
            Role.findByPk(user.roleId).then(ss => {
                return res.status(200).send({
                    status: 'success',
                    message: 'User Logged In!',
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: ss.name.toUpperCase(),
                        token: token
                    }

                });
            })
        });
    } catch (err) {
        res.status(500).send({
            status: 'Loggin Fail',
            message: err.message,
        });
    };

}
// get user all
exports.findAllUser = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email',]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({

            message: err.message
        });
    });

}
exports.findAllRoles = (req, res) => {
    Role.findAll({
        attributes: ['id', 'name',]
    }).then(role => {
        console.log(`=========> find role user ${role}`)
        res.send(role);
    }).catch(err => {
        res.status(500).send({

            message: err.message
        });
    });

}
// sign out