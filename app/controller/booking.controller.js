
const db = require('../models');
const Booking = db.booking;
const Op = db.sequelize.Op;

// 1 create booking meeting
exports.create = (req, res) => {
    // validate 
    if (!req.body.title) {
        res.status(400).sent({
            message: "Title can't be empty"
        });
    }
    const booked = {
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        userId: req.userId,
        roomId: req.body.roomId
    }
    Booking.create(booked).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ "message": err.message || "can not create booking" });
    });
};

// 2 get all booking meeting
exports.findAll = (req, res) => {
    const uid = req.userId;
    var condition = uid ? { userId: uid } : null
    // const title = req.body.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}` } } : null
    Booking.findAll({
        where: condition,
        attributes: [
            "id", "title", "description",
        ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Booking.',
        });
    });

};

//3 update booking meeting
exports.update = (req, res) => {
    const id = req.params.id;
    Booking.update(req.body, {
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Booking was update successfully",
            });
        } else {
            res.send({
                message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Tutorial with id=" + id,
        })
    });

};

//4 delete booking meeting by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Booking.destroy({
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: 'Booking was deleted successfully!'
            });
        } else {
            res.send({
                message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Booking with id=" + id,
        });
    });

};
// 5 get booking details by id
exports.getBookingDetail = (req, res) => {
    const id = req.params.id;
    Booking.findByPk(id).then(result => {
        res.status(200).send({
            detail: result
        });
    }).catch(err => {
        res.status(404).send({
            message: err.message || 'booking Not Found'
        });
    });
};

