// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// =============================================================

var reservations = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function (req, res) {
  res.sendFile(path.join(__dirname, "makeRes.html"));
});

app.get("/waitlist", function (req, res) {
  res.sendFile(path.join(__dirname, "waitlist.html"));
});
//pushing first five entries to tables array
app.get("/api/tables", function (req, res) {
  var tables = [];
  for (var i = 0; i < 5 && i < reservations.length; i++) {
    tables.push(reservations[i]);
  }
  return res.json(tables);
});
//pushing the remainging entries to waitlist

app.get("/api/waitlist", function (req, res) {
  var waitlist = [];
  if (reservations.length > 5) {
    for (var i = 5; i < reservations.length; i++) {
      waitlist.push(reservations[i]);
    }
    return res.json(waitlist);
  }
  return res.json(waitlist);
});


// Create New Characters - takes in JSON input
app.post("/api/reservation", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newRes = req.body;

  console.log(newRes);

  reservations.push(newRes);

  res.json(newRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
