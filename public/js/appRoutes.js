angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
		.when('/users', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.otherwise({
        	redirectTo: '/'
      	});

	$locationProvider.html5Mode(true);
}]);