'use strict';

/* App Module */

var sqnc = angular.module('sqnc', [
    'ngRoute',
    'ngAnimate',
    'sqncControllers',
    'sqncDirectives',
	'sqncAnimations'
]);

sqnc.config(['$routeProvider',
function ($routeProvider)
	{
		$routeProvider.
		when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		when('/!', {
			templateUrl: 'partials/game.html',
			controller: 'GameCtrl'
		}).
		when('/!!', {
			templateUrl: 'partials/gameover.html',
			controller: 'GameOverCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);