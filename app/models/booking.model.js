module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define('bookings', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'is required!'
                }
            }
        },
        startTime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        endTime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Booking;
};