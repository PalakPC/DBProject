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

//Not sure if this works correctly. TODO
function handleDisconnect(connection) {
	connection.on('error', function(err){
				console.log('\nReconnecting...  Lost connection: ' + err.stack);
				connection.destroy();

				connection = mysql.createConnection(connection.config);
				handleDisconnect(connection);
				connection.connect();
			});
}

handleDisconnect(connection);
connection.connect();

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/login_page', function(req, res){
		res.render('login_page.html');
		});
app.get('/', function(req, res){
		res.render('login_page.html');
		});
