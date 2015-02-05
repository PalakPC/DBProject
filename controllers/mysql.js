var mysql = require("mysql");
var url = require("url");
var queryString = require("querystring");

var connection = mysql.createConnection( {
	host: 'localhost',
	user: 'root',
	password: 'palak',
	database: 'DBproject'
});
connection.connect();

var MysqlController = {
	configure : function() {
		var result;
        connection.query('select username from users where username = "admin";', function(err, result) {
			if (err)
				throw err;
			if (result == "") {
				var post = {username: 'admin', password: 'adminadmin', fname: 'admin', lname: 'admin', email: 'admin@domain.com', isAdminFlag: 1};
				connection.query('INSERT INTO users SET ?', post, function(err, result) {
					if (err)
						throw err;
				});
			}
		});
	},
	
	helper : {
		authenticate : function(req, res, next) {
			var isAuthenticated = false;
			if (req.session.username)
				isAuthenticated = true;

			if (isAuthenticated)
				next();

			else {
				console.log("Authentication error");
				res.send("Authentication error");
				res.redirect('/login');
			}
		},

		authenticateAdmin : function(req, res, next) {
			var isAuthenticated = false;
			if (req.session.username && req.session.isAdminFlag == true)
				isAuthenticated = true;
			if (isAuthenticated)
				next();
			else {
				console.log("Admin verification failed");
				res.send("Admin verification failed");
				res.redirect('/login');
			}
		}
	},

	loginPage : function(req, res) {
		res.sendfile("login_page.html", {root: "./views/"});
		req.session.lastPage = '/login';
	},

	logout : function(req, res) {
		req.session.destroy();
		res.status(302).redirect("/login");
	},

    homed : function(req, res, next) {
        res.sendfile("homed.html", {root: "./views/"});
    },

	home : function(req, res, next) {
		res.sendfile("home.html", {root: "./views/"});
	},

	login : function (req, res) {
		var username = req.param("username", "");
		var password = req.param("password", "");
		var query = 'select password from users where username = "' + username + '";';
		var result;
		
		connection.query(query, function(err, rows) {
			if (err)
				throw err;
			result = JSON.stringify(rows);
			password = '[{"password":"'+password+'"}]';	
			if (!result) {
				res.redirect('/login');
			}

			else if(result != password) {
				res.redirect('/login');
			}

			else {
				req.session.username = username;
                connection.query('select isAdminFlag from users where username = "' + username + '";', function(err1, row) {
                    var test = '[{"isAdminFlag":1}]';
                    var type = JSON.stringify(row);
                    if (type != test) {
                        res.session.isAdminFlag = false;
                        res.redirect('/home');
                    }
                    else {                   
                        req.session.isAdminFlag = true;
    				    res.redirect('/homed');
                    }
		        });
            }
        });
	},

	registerPage : function (req, res) {
		req.sendfile ("register.html", {root: "./views/"});
		req.session.lastPage = '/login';
	},

	register : function (req, res, next) {
		var username = req.param ("username", "");
		var password = req.param ("password", "");
		var fname = req.param ("first_name", "");
		var lname = req.param ("last_name", "");
		var email = req.param ("email", "");
		var isAdminFlag = req.param ("isAdminFlag", "");

		if (username == 'Username') {
			res.send ("Please input a valid username");
			return;
		}

		if (username == 'mail@address.com') {
			res.send ("Please input a valid email address");
			return;
		}

		if (isAdminFlag === "")
			isAdminFlag = false;

		connection.query ('select username from users where username = "' + username + '";', function (err, result) {
			if (err)
				throw err;

			if (result)
				res.send ("This username is already taken...");

			else {
				connection.query ('select email from users where email = "' + email + '";');
				if (err) 
					throw err;

				if (result)
					res.send ("This email id is already registered...");

				else {
					var post = {username: username, password: password, email: email, isAdminFlag: isAdminFlag};
					connection.query ('insert into users set ?', post, function (err, result) { 
						if (err)
							throw err;
					} );
					res.send ("Thanks for registering...");
				}
			}
		} );
	},

     pickupPage : function (req, res, next) {
		res.sendfile ("pickups.html", {root: "./views/"} );
	},

     bags : function (req, res, next) {
          res.sendfile ("bags.html", {root: "./views/"} );
     },
     
     dropoff : function (req, res, next) {
          res.sendfile ("dropoff.html", {root: "./views/"} );
     },

     clients : function (req, res, next) {
          res.sendfile ("clients.html", {root: "./views/"} );
     },

     report : function (req, res, next) {
          res.sendfile ("reports.html", {root: "./views/"} );
     },

     products : function (req, res, next) {
          res.sendfile ("products.html", {root: "./views/"} );
     },
     
     pickups : function (req, res, next) {
          var number = req.param("pday", "");
          connection.query ("select * from clients where pday = "+number+";", function (err, rows, fs) {
                results = JSON.stringify(rows);
               res.json(result);
               });
               },
};

module.exports = MysqlController;
