var mysql = require("mysql");
var express = require("express");
var config = require("./config/config.js");
var MysqlController = require("./controllers/mysql.js");
var _ = require("underscore");

var app = express();

require("./config/express.js")(app, config);

app.get('/', function(req, res){
	res.redirect("login");
});

app.get("/login", MysqlController.loginPage);
app.get("/home", MysqlController.helper.authenticate, MysqlController.home);

app.post("/login", MysqlController.login);
app.post("/logout", MysqlController.logout);

app.listen(config.SERVER_PORT);
console.log("Server up and running at --> " + config.SERVER_PORT);
