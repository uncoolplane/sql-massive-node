angular.module('eCommerce').service('productService', function($http) {
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products'
    })
    // .then(function(response) {
    //   console.log('productService', response);
    //   return response.data;
    // })
  }
})
