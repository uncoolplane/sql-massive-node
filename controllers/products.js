module.exports = {
  getProducts: function(db) {
    db.get_products(function(err, products) {
      if(err) {
        console.log('getProducts', err);
      }
      console.log('products', products);
      return products;
    })
  },
  getProduct: function(db, id) {
    db.get_product([id], function(err, product) {
      if(err) {
        console.log('getProduct', id, err);
      }
      return product;
    })
  },
  createProduct: function(db, product) {
    db.create_product([product.name,product.description,product.unitprice,product.imageurl], function(err, prod) {
      if(err) {
        console.log('createProduct', product, err);
      }
      return prod;
    })
  },
  updateProduct: function(db, product) {
    db.update_product([product.name,product.description,product.unitprice,product.imageurl, product.id], function(err, product) {
      if(err) {
        console.log('updateProduct', product, err);
      }
      return product;
    })
  },
  deleteProduct: function(db, id) {
    db.delete_product([id], function(err) {
      if(err) {
        console.log('deleteProduct', id, err);
      }
      return true;
    })
  },
  deleteAllProducts: function(db) {
    db.delete_all(function(err) {
      if(err) {
        console.log('deleteAllProducts', err);
      }
      return true;
    })
  }
}
