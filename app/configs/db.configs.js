module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'admin',
    DB: 'booking-room',
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

};