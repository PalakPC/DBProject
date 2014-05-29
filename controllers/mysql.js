var mysql = require("mysql");
var childProcess = require("child_process");
var url = require("url");
var queryString = require("querystring");

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'palak',
	database: 'DBproject'
});
connection.connect();

var MysqlController = {

	configure: function(){
		var result;
		connection.query('select username from users where username="admin";', function(err, rows, fs){
			if (err){
				throw err;
			}
			result = JSON.stringify(rows);
			if(!rows){
				connection.query('insert into users values (1, "admin", "adminadmin, "admin", "admin", "admin@domain.com", "admin");', function(err, result){
					if(err){
						throw err;
					}
				});
			}
		});
	},
	
	helper: {
		authenticate : function(req, res, next) {
			var isAuthenticated = false;
			if (req.session.username) {
				isAuthenticated = true;
			}
			if (isAuthenticated) {
				next();
			}
			else {
				console.log("Authentication error");
				res.send("Authentication error");
				res.redirect('/login');
			}
		}
	},

	loginPage: function(req, res) {
		res.sendfile("login_page.html", {root: "./views/"});
//		req.session.lastPage = '/login';
	},

	logout: function(req, res){
		req.session.destroy();
		res.status(302).redirect("/login");
	},

	home: function(req, res, next){
		res.sendfile("home.html", {root: "./views/"});
	},

	login: function(req, res) {
		var username = req.param("username", "");
		var password = req.param("password", "");
		var query = 'select password from users where username="'+username+'";';
		var result;
		password = '[{"password":"'+password+'"}]';
		connection.query(query, function(err, rows, fs) {
			if(err){
				throw err;
			}
			result = JSON.stringify(rows);
			console.log(result);
			if(!result){
				res.redirect('/login');
			}
			else if (result != password){
				res.redirect('/login');
			}
			else{
			//	req.session.username = username;
			}
		});
		res.redirect('/home');
	},
};

module.exports = MysqlController;

