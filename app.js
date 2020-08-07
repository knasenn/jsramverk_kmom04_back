const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 8333;
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

// *************** databas grejor ****************
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path')
// const dbPath = path.resolve("db", 'texts.sqlite')

// const sqlite3 = require('sqlite3').verbose();
// const path = require('path')
//
// if (process.env.NODE_ENV === 'test') {
// 	const dbPath = path.resolve("db", 'test.sqlite')
// } else {
// 	const dbPath = path.resolve("db", 'texts.sqlite')
// }

const db = require("./db/database.js");

// //const index = require('./routes/index');
const reports = require('./routes/reports');
const login = require('./routes/login');
// const login = require('./routes/login');

var globalToken = "";

//bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());


// ---------------------------------------------------------


// //app.use('/', index);
app.use('/reports', reports);
app.use('/login', login);


app.get('/', function(req, res, next) {
    const data = {
            title: 'Me',
            body: 'Hejsan! Jag har valt REACT som mitt ramverk och tror det kommer bli en rolig samt lärorik upplevelse!'
    };

    res.json(data);
});

// Add a route
app.get("/logg", (req, res) => {
  // console.log("----------------");
  // console.log("req.body");
  // console.log("----------------");
  res.end("string-get");
});


// Add a route
app.post("/logg", (req, res) => {
  // console.log("----------------");
  // console.log(req.body);
  // console.log("----------------");
  res.end("string-post");
});

// Testing routes with method
app.get("/user", (req, res) => {
    // console.log(req.body);
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

app.post("/user", (req, res) => {
    // console.log(req.body);
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});







// Add a route
app.post("/register", (req, res) => {
  // console.log("----------------");
	// console.log("*create_user PSOT2*");
  // console.log("----------------");
	db.each("SELECT COUNT(*) AS total FROM users WHERE email = ?",
  req.body.email,(err, row) => {
	if (row.total == 1) {
		res.json({
	        data: {
	            msg: "User exist"
	        }
	    });
	} else {
		db.run("INSERT INTO users (name, email, password, year, month, day) VALUES (?, ?, ?, ?, ?, ?)",
				req.body.name,req.body.email,req.body.password,req.body.year,req.body.month,req.body.day, (err) => {
				if (err) {
					// console.log("error");
					res.json({
							data: {
									msg: "POST user NOT created"
							}
					});
				}
				// console.log("no error");
				res.json({
						data: {
								msg: "POST user created"
						}
				});
		});
	}
  });
});


// Add a route
app.post("/login", (req, res) => {
  // console.log("----------------");
	// console.log("*login_user PSOT2*");
  console.log(req.body.email);
  console.log(req.body.password);
	db.each("SELECT COUNT(*) AS total FROM users WHERE (email, password) = (?,?)",
  req.body.email,req.body.password,(err, row) => {
	if (row.total == 1) {
		// console.log("yes, user exist");
		const user = {
			email: req.body.email,
			password: req.body.password
		}
		jwt.sign({user}, "secretkeye8600f5a58e83c4398e83d582137e83798789864276c35dff374f3d365e4d4cb", (err, token) => {
			// console.log("token1");
			// console.log(token);
			// console.log("token1");
			globalToken = token;
			res.json({
				token
			});
		});
	} else {
		// console.log("user does NOT exist");
		res.json({
			msg: "erro"
		});
	}
  });
});


// Add a route
app.get("/login/test_user", verifyToken, (req, res) => {
	// console.log("----------------");
	// console.log("*testing.....*");
  	// console.log(req.token);
	// console.log(globalToken);
  	// console.log("----------------");
	jwt.verify(req.token, "secretkeye8600f5a58e83c4398e83d582137e83798789864276c35dff374f3d365e4d4cb", (err, authData) => {
		if (err) {
			// console.log("errror auth");
			res.json({
					data: {
							msg: "forbidden auth"
					}
			});
		} else {
				res.json({
					token: globalToken,
					text: "text test",
					msg: "verified",
					authData
				});
			}
	});

});

//verify verifyToken Middleware
function verifyToken(req, res, next) {
	//get auth header val
	// const bearerHeader = req.headers["authorization"];
	const bearerHeader = globalToken;
	// console.log("*bearerHeader*");
	// console.log(bearerHeader);
	// console.log("*bearerHeader*");
	// check berarer
	if (typeof bearerHeader !== "undefined") {
		req.token = bearerHeader;
		next();

	} else {
		//forbidden
		// console.log("forbidden");
		// res.sendStatus(403);
		res.json({
				data: {
						msg: "forbidden"
				}
		});
	}

}




// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    // console.log(req.method);
    // console.log(req.path);
    // console.log("*middleware*");
    next();
});









// //***********************************
// //Kanske flytta?
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
// //***********************************




// //***********************************
// //Vet ej
// app.use(cors());
//
// // don't show the log when it is test
// if (process.env.NODE_ENV !== 'test') {
//     // use morgan to log at command line
//
//     app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
// }
// //***********************************










// // Add a route
// app.get("/createuser", (req, res) => {
//     db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//         "user@example.com",
//         "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
//         if (err) {
//           res.json({
//               data: {
//                   msg: "err0rz"
//               }
//           });
//         }
//
//         res.json({
//             data: {
//                 msg: "user created"
//             }
//         });
//     });
// });











// app.listen(port, () => console.log(`Example API listening on port ${port}!`));


const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;




// module.exports = (function () {
//     if (process.env.NODE_ENV === 'test') {
//         return new sqlite3.Database('./db/test.sqlite');
//     }
//
//     return new sqlite3.Database('./db/texts.sqlite');
// }());











//
// // Add routes for 404 and error handling
// app.use((req, res, next) => {
//     var err = new Error("Not Foundz!");
//     err.status = 404;
//     next(err);
// });
//
// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         return next(err);
//     }
//
//     res.status(err.status || 500).json({
//         "errors": [
//             {
//                 "status": err.status,
//                 "title":  err.message,
//                 "detail": err.message
//             }
//         ]
//     });
// });
