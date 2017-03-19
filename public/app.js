angular.module('eCommerce', ['ui.router'])

.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: './views/products.html',
		controller: 'productsCtrl'
	});

	$urlRouterProvider.otherwise('/');

});
