//vars declared and defined
var url = require("url");
var util = require("util");
var mysql = require("mysql");
var express = require("express");

var connection = mysql.createConnection({
			user: "root",
			password: "fire",
			host: "127.0.0.1",
			port: "3306",
			database: "dbprojectdb",
		});

