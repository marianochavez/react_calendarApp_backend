const express = require("express");
const { dbConnection } = require("./database/config");
var cors = require('cors');
require('dotenv').config();


const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public folder
app.use(express.static("public"));

// Body Parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/event'));


// Listen
app.listen( process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
});