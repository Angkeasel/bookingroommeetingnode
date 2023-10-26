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
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Booking;
};