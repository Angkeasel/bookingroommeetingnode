module.exports = app => {
    const rooms = require('../controller/room.controller.js');
    var router = require('express').Router();
    // create new room 
    router.post('/', rooms.create);
    // retrieve all room
    router.get('/', rooms.findAll);
    // detele room by id
    router.delete('/:id', rooms.delete);

    app.use('/api/room', router);
}