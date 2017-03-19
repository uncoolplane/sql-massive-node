var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var config = require('./config');
var productsCtrl = require('./controllers/products');

var app = module.exports = express();
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

/*******Products*******/
app.get('/api/products', function(req, res, next) {
  productsCtrl.getProducts(db).then(function(products) {
    res.status(200).send(products);
  });
  // console.log('2 products', products);
});

app.get('/api/product/:id',  function(req, res, next) {
  var id = req.params.id;
  res.send({product: productsCtrl.getProduct(db, id)});
});

app.put('/api/product', cors(), function(req, res, next) {
  var product = productsCtrl.createProduct(db, req.body);
  res.send({product: product});
});

app.post('/api/product', cors(), function(req, res, next) {
   var product = productsCtrl.updateProduct(db, req.body);
   res.send({product: product});
});

app.delete('/api/product/:id', cors(), function(req, res, next) {
  productsCtrl.deleteProduct(db, req.params.id);
  res.send({isUpdated:true});
})

app.listen(port, function() {
  console.log('Listening on port', port, 'for aliens');
})
