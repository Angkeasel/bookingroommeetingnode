const dbConfigs = require('../configs/db.configs.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfigs.DB, dbConfigs.USER, dbConfigs.PASSWORD, {
    host: dbConfigs.HOST,
    dialect: dbConfigs.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfigs.pool.max,
        min: dbConfigs.pool.min,
        acquire: dbConfigs.pool.acquire,
        idle: dbConfigs.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.rooms = require('./room.model.js')(sequelize, Sequelize);
db.booking = require('./booking.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.roles = require('./role.model.js')(sequelize, Sequelize);


// Relationship
db.roles.belongsTo(db.user);
db.user.belongsTo(db.roles);
db.rooms.belongsTo(db.user);
db.booking.belongsTo(db.user);
db.booking.belongsTo(db.rooms);


db.user.hasMany(db.rooms);
db.user.hasMany(db.booking);
db.rooms.hasMany(db.booking);
db.roles.hasMany(db.user);

module.exports = db;

