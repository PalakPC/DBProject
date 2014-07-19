/*Node.js server for Food Pantry Information Management System.*/

var mysql = require ("mysql");
var express = require ("express");
var config = require ("./config/config.js");
var MysqlController = require ("./controllers/mysql.js");
var _ = require ("underscore");

var app = express ();

require ("./config/express.js") (app, config);

app.get ('/', function (req, res) {
	res.redirect ("login");
} );

app.get ("/login", MysqlController.loginPage);
app.get ("/register", MysqlController.helper.authenticateAdmin, MysqlController.registerPage);
app.get ("/home", MysqlController.helper.authenticate, MysqlController.home);
app.get ("/pickups", MysqlController.helper.authenticate, MysqlController.pickupPage);
app.get ("/bags", MysqlController.helper.authenticate, MysqlController.bags);
app.get ("/dropoff", MysqlController.helper.authenticate, MysqlController.dropoff);
app.get ("/clients", MysqlController.helper.authenticate, MysqlController.clients);
app.get ("/reports", MysqlController.helper.authenticate, MysqlController.report);
app.get ("/products", MysqlController.helper.authenticate, MysqlController.products);

app.post ("/login", MysqlController.login);
app.post ("/logout", MysqlController.logout);
app.post ("/register", MysqlController.helper.authenticateAdmin, MysqlController.register);

app.listen (config.SERVER_PORT);
console.log ("MySQL server up and running at --> " + config.SERVER_PORT);
