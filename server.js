const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const DROP = true;

// cross origin resource sharing
app.use(cors(corsOptions));

// build-in middleware for json
app.use(express.json());

//build-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }));

function initialRoles() {
    if (DROP) {
        db.roles.create({
            id: 1,
            name: "user",
            // description: "Can perform any related booking function."
        });

        db.roles.create({
            id: 2,
            name: "admin",
            // description: "Can do everythings!"
        });
    }

}
db.sequelize.sync({ force: DROP }).then(() => {
    initialRoles();
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
//=====>
var corsOptions = {
    origin: 'http://localhost:8081',
};
//======> for route 
require('./app/routes/room.routes')(app);
require('./app/routes/booking.routes')(app);
require('./app/routes/user.routes')(app);


//=====> End route
//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
// simple route
app.get('/', (req, res) => {
    res.json({ 'message': 'Hello would' });
});