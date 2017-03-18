var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');

var app = express();
var port = process.env.PORT || 8887;
var corsOptions = {
  origin: 'http://localhost:' + port
};

app.use(express.static('public'));
app.use(session({
    secret: 'sql-massive-node'
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var connectionString = "postgres://postgres:admin@localhost/eCommerceDb";
var instance = massive.connectSync({
  connectionString: connectionString
});

app.set('db', instance);

//app.get('', cors(), function(req, res, next) {
//  res.send('working');
//})

//app.post('', cors(), function(req, res, next) {
//  res.send('working');
//})

//app.put('', cors(), function(req, res, next) {
//  res.send('working');
//})

app.listen(port, function() {
  console.log('Listening on port', port, 'for aliens');
})