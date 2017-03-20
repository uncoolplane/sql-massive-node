module.exports = function(db) {
  return {
    getProducts: function(req, res, next) {
      db.get_products(function(err, products) {
        res.send(products);
      })
    },
    getProduct: function(req, res, next) {
      var id = req.params.id;
      db.get_product([id], function(err, product) {
        if(err) {
          console.log('getProduct', id, err);
        }
        res.send(product)
      })
    },
    createProduct: function(req, res, next) {
      var product = req.body;
      db.create_product([product.name,product.description,product.unitprice,product.imageurl], function(err, product) {
        if(err) {
          console.log('createProduct', product, err);
        }
        res.send(product);
      })
    },
    updateProduct: function(req, res, next) {
      var product = req.body;
      db.update_product([product.name,product.description,product.unitprice,product.imageurl, product.id], function(err, product) {
        if(err) {
          console.log('updateProduct', product, err);
        }
        res.send(product);
      })
    },
    deleteProduct: function(req, res, next) {
      var id = req.params.id;
      db.delete_product([id], function(err) {
        if(err) {
          console.log('deleteProduct', id, err);
        }
        res.send({isSuccessful: true})
      })
    }
  }
}
