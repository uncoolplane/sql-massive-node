angular.module('eCommerce').controller('productsCtrl', function($scope, productService) {
    productService.getProducts()
    .then(function(response) {
      console.log(response);
      $scope.products = response.data;
    }, function(err) {
      console.log(err);
    })
})
