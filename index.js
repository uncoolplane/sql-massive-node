var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var config = require('./config');
var products = require('./controllers/products');

var app = express();
var port = process.env.PORT || 8887;
var corsOptions = {
  origin: 'http://localhost:' + port
};

app.use(express.static('public'));
app.use(session({
    secret: config.sessionSecret
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var connectionString = "postgres://" + config.dbUser + ":" + config.dbPassword + "@localhost/" + config.database;
var instance = massive.connectSync({
  connectionString: connectionString
});

app.set('db', instance);

var db = app.get('db');

app.get('/api/products', cors(), function(req, res, next) {
 res.send(products.getProducts(db));
});

app.get('/api/product/:id', cors(), function(req, res, next) {
  var id = req.params.id;
  res.send(products.getProduct(db, id));
});

app.put('/api/product', cors(), function(req, res, next) {
  var product = products.createProduct(db, req.body);
  res.send(product);
});

app.post('/api/product', cors(), function(req, res, next) {
   var product = products.updateProduct(db, req.body);
   res.send(product);
});

app.delete('/api/product/:id', cors(), function(req, res, next) {
  products.deleteProduct(db, req.params.id);
  res.send(true);
})

app.listen(port, function() {
  console.log('Listening on port', port, 'for aliens');
})
