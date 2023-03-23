// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

// getting a json object with unix and utc key
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  // check if optional date parameter was not included
  if (!dateString) {
    // if not included, get current date
    let date = new Date();
    // return json object
    return res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  } else {
    // check if dateString is unix form already, if so then convert dateString to an Int and run through new Date(), otherwise convert to new Date() using dateString as is
    date = (!isNaN(dateString)) ? new Date(parseInt(dateString)) : new Date(dateString);
    // if date is invalid format return Invalid Date message 
   if (!(date instanceof Date) || isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
  };
    // if date is valid format, return json object
   return res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
