// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for empty date_string
app.get('/api/timestamp', (req, res) => {
  res.send(timestampJSON(new Date()))
})

// API endpoint for date_string
app.get('/api/timestamp/:date_string', (req, res) => {
  const date_string = req.params.date_string
  // Checks whether it's a millisecond or UTC string
  const date = new Date(!isNaN(date_string) ? parseFloat(date_string) : date_string)
  if (validDate(date)) {
    res.send(timestampJSON(date));
  } else {
    res.send({ error: 'Invalid Date' })
  }
})

// checks whether Date is valid
function validDate(d) {
  return d instanceof Date && !isNaN(d)
}

// timestamp JSON format
function timestampJSON(d) {
  return { unix: d.getTime(), utc: d.toUTCString() }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});