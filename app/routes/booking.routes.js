module.exports = app => {
    const book = require('../controller/booking.controller.js');
    var router = require('express').Router();
    app.use('/api/booking', router);

    // create new booking
    router.post('/', book.create);
    router.get('/', book.findAll);
    router.put('/:id', book.update);
    router.delete('/:id', book.delete);
}