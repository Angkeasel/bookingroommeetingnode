const db = require('../models');
const Room = db.rooms;
const Op = db.sequelize.Op;
//1 create room
exports.create = (req, res) => {
    // Validation request
    if (!req.body.name) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }
    // create room
    const room = {
        name: req.body.name
    };
    // save room in database
    Room.create(room).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while create room'
        });
    });
};
//2 find all room from database
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Room.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving rooms.'
        });
    });
};
//3 delete a room with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Room.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `room with ${id} was deleted successfully!`
            });
        } else {
            res.send({
                message: `can't delete room with id=${id}. Maybe rooms was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete room with id= " + id
        });
    });
};