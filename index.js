var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var config = require('./config');
var productsCtrl = require('./controllers/products');
var testCtrl = require('./controllers/test');

var app = /*module.exports = */express();

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
var productsCtrl = testCtrl(db);

/*******Products*******/
app.get('/api/products', productsCtrl.getProducts);
app.get('/api/product/:id', productsCtrl.getProduct);
app.put('/api/product', productsCtrl.createProduct);
app.post('/api/product', productsCtrl.updateProduct);
app.delete('/api/product/:id', productsCtrl.deleteProduct);

app.listen(port, function() {
  console.log('Listening on port', port, 'for aliens');
})
