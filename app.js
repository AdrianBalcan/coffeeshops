// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 9000; // set our port

// configure database and inserting some coffeeshops
db.serialize(function() {
    db.run("CREATE TABLE coffeeshops (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, address TEXT NOT NULL, description TEXT NOT NULL)");
    db.run("INSERT INTO coffeeshops (name, address, description) VALUES ('Caffè Nero', '24 Golders Green Rd, London', 'Casual coffeee-shop chain with a menu of Italian-style light dishes and specially blended drinks.')");
    db.run("INSERT INTO coffeeshops (name, address, description) VALUES ('Coffe Cup', '12 Hampstead High St, London', 'Coffee bar that keeps its 1960s style but adds Italian dishes and stays open until midnight.')");
    db.run("INSERT INTO coffeeshops (name, address, description) VALUES ('Costa Coffee', '144 Golders Green Rd, London', 'Counter-service coffee chain offering hot drinks, iced coolers, sweet snacks and sandwiches.')");
    db.run("INSERT INTO coffeeshops (name, address, description) VALUES ('Prufrock', '33 Leather Ln, London', 'Expertly trained baristas serve bespoke brews in a buzzy open-plan cafe with minimal furnishings.')");
    db.run("INSERT INTO coffeeshops (name, address, description) VALUES ('Starbucks', '11 Golders Green Rd, London', 'Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.')");
});

app.all('/', function(req, res) {
    res.send('Adrian Balcan - Code Test.Please use /coffeeshops');
});

app.route('/coffeeshops')
    .get(function(req, res, next) {
        db.serialize(function() {
            db.all("SELECT * FROM coffeeshops", function(err, rows) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(rows);
                }
            });
        });
    })
    .post(function(req, res, next) {
        db.serialize(function() {
            db.all("INSERT INTO coffeeshops (name, address, description) VALUES (?, ?, ?)", [req.body.name, req.body.address, req.body.description], function(err, rows) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send({
                        "response": "Succesful inserted!"
                    });
                }
            });
        });
    })
app.route('/coffeeshops/:id')
    .get(function(req, res, next) {
        db.serialize(function() {
            db.all("SELECT * FROM coffeeshops where ID = ?", req.params.id, function(err, rows) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    if (rows == '') {
                        res.status(404).send(rows);
                    } else {
                        res.send(rows);
                    }
                }
            });
        });
    })
    .put(function(req, res, next) {
        db.serialize(function() {
            db.all("SELECT id FROM coffeeshops where ID = ?", req.params.id, function(err, rows) {
                if (err) {
                    res.status(500).send(err);
                } else if (rows == '') {
                    res.status(404).send({
                        "response": "ID Not Found!"
                    });
                } else {
                    db.all("UPDATE coffeeshops SET name = ?, address = ?, description = ? where id = ?", [req.body.name, req.body.address, req.body.description, req.params.id], function(err, rows) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send({
                                "response": "Succesful updated!"
                            });
                        }
                    });
                }
            });
        });
    })
    .delete(function(req, res, next) {
        db.serialize(function() {
            db.all("SELECT id FROM coffeeshops where ID = ?", req.params.id, function(err, rows) {
                if (err) {
                    res.status(500).send(err);
                } else if (rows == '') {
                    res.status(404).send({
                        "response": "ID Not Found!"
                    });
                } else {
                    db.serialize(function() {
                        db.all("DELETE FROM coffeeshops where id = ?", req.params.id, function(err, rows) {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.send({
                                    "response": "Succesful removed!"
                                });
                            }
                        });
                    });
                };
            });
        });
    })

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
