var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var config = require("./config/index.js");
var routes = require("./app/routes/index.js");
var cors = require('cors');
const DEFAULT_PORT = 8090;

var app = express();
passport.use(config.strategy);

app.use(passport.initialize());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/', routes);

app.listen(DEFAULT_PORT, function() {
  console.log("server is running at port "+DEFAULT_PORT);
});