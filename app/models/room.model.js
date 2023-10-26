module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define('room', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'is required!'
                }
            }
        }
    });
    return Room;
};