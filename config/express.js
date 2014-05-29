var express = require("express");
var MysqlController = require("../controllers/mysql.js");

module.exports = function(app, config){
	app.configure(MysqlController.configure);
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.static(config.ROOT_PATH + "/views"));
	app.use(express.cookieParser());
	app.use(app.router);
};
