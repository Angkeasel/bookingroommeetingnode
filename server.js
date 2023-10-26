const express = require('express');
const cors = require('cors');

const app = express();
var corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
})
//======> for route 
require('./app/routes/room.routes')(app);
require('./app/routes/booking.routes')(app);
require('./app/routes/user.routes')(app);


//=====> End route

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ 'message': 'Hello would' });
});