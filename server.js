//==============================================================================
//Dependencies
//==============================================================================

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
//CORS is used for testing purposes
// const cors = require('cors');

// DB Setup - Require All Models
const db = require('./models');

// Specify Database (Production || Local)
// const MONGODB_URI = "mongodb://localhost:auth/auth";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/auth";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


//==============================================================================
//App Setup
//==============================================================================

//app.use registers middleware
//morgan is a logging framework
app.use(morgan('combined'));
//bodyParser parses requests into json
app.use(bodyParser.json({ type: '*/*' }));

//Use CORS for testing purposes
// app.use(cors());

//Allow for access to the build file in heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

//==============================================================================
//Routes
//==============================================================================

require("./routes/authentication-routes")(app);
require("./routes/comments-routes")(app);
require("./routes/reply-routes")(app);
// require("./routes/html-routes")(app);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
})
//==============================================================================
//Server Setup
//==============================================================================

//Specify Port
const PORT = process.env.PORT || 3001;
//Forward HTTP Requests to Express
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on:', PORT);
