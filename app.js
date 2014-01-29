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
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/login_page', function(req, res){
		res.render('login_page.html');
		});
app.get('/', function(req, res){
		res.render('login_page.html');
		app.post('/login', function(req, res){
			var uname = req.body.username;
			//console.log(uname);
			var pw = req.body.password;
			//console.log(pw);
			connection.query('select * from user', function(err, rows, fields){
				var i = 0;
				var c = 0;
				for (i=0; i<rows.length; ++i){
					if((rows[i].uname==uname)&&(rows[i].pword==pw)){
						console.log("success");
						c=1;
					}
				}
				if(c==0){
					console.log("denied");//would route back to login page with error msg.
				}
			});
		});
	});
app.listen(8888);
