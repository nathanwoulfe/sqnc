'use strict';

/* Controllers */

var sqncControllers = angular.module('sqncControllers', []);

sqncControllers.controller('HomeCtrl', ['$scope', '$rootScope', '$location',
	function ($scope, $rootScope, $location)
	{
		$scope.init = function (i) {
			$rootScope.difficulty = i;
			$location.path('/!');
		}

}]);

sqncControllers.controller('GameOverCtrl', ['$scope', '$rootScope', '$location',
	function ($scope, $rootScope, $location)
	{
		$scope.reset = function (i) {
			$rootScope.difficulty = 0;
			$location.path('/');
		}

		if (typeof $rootScope.difficulty === 'undefined') {
			$scope.reset();
		}

}]);

sqncControllers.controller('GameCtrl', ['$scope', '$rootScope', '$location', '$animate',
	function ($scope, $rootScope, $location, $animate)
	{
		function reset() {

			console.log('reset');

			$rootScope.started = false;
			$rootScope.difficulty = 0;
			$('.container-fluid').removeClass('fail');
			$location.path('/');
		}

		$scope.reset = function () {
			reset();
		}

		$scope.init = function () {

			if (typeof $rootScope.difficulty === 'undefined') {
				reset();
			} else {

				$('body').removeClass('crazy, hard');
				$scope.difficulty = $rootScope.difficulty;
				$scope.tiles = [0, 1, 2, 3, 4];
				$scope.round = [];
				$scope.lastMove = null;
				$scope.totalMoves = 0;
				$scope.currentLevelMoves = 0;
				$scope.currentLevel = 1;
				$rootScope.score = 0;
				$scope.prompt = null;

				if ($scope.difficulty === 5) {
					$('body').addClass('nuts');
				} else if ($scope.difficulty === 4) {
					$('body').addClass('hard');
				}

				$scope.gameProgression = buildGameProgression($scope.difficulty);
				$rootScope.started = true;
				levelPrompt();
			}
		}
		$scope.init();

		$scope.logMove = function (i) {
			$scope.lastMove = i;

			if ($scope.lastMove === $scope.round[$scope.currentLevelMoves]) {
				$scope.totalMoves++;
				$scope.currentLevelMoves++;

				incrementScore();

				if ($scope.currentLevelMoves === $scope.currentLevel) {
					$scope.currentLevel++;
					levelPrompt();
				}
			} else {

				$location.path('/!!');

			}
		}



		function buildGameProgression(n) {
			var x = [];
			for (var i = 0; i < n * 10; i++) {
				x[i] = Math.floor(Math.random() * n);
			}
			$scope.prompt = x[0];
			return x;
		}

		function incrementScore() {
			var x = Math.floor(Math.sqrt($scope.currentLevelMoves * ($scope.currentLevel * $scope.currentLevel)));
			$rootScope.score = $rootScope.score + x;
		}

		function levelPrompt() {
			$scope.currentLevelMoves = 0;
			$scope.round = $scope.gameProgression.slice(0, $scope.currentLevel);

			var i = 0;

			setTimeout(function () {
				$scope.promptText = 'Wait...';
				$scope.$digest();
				$('.prompt').fadeIn(200);
				prompt();
			}, 1000);

			function prompt() {

				setTimeout(function () {
					$scope.prompt = $scope.round[i];
					$animate.addClass($('#' + $scope.prompt), 'pulsate', function () {
						$animate.removeClass($('#' + $scope.prompt), 'pulsate')
					});
					i++;
					if (i < $scope.round.length) {
						prompt();
					} else {
						setTimeout(function () {
							$scope.promptText = 'Go!';
							$scope.$digest();
							$('.prompt').fadeOut(1000);
						}, 1000);
					}
				}, 1000);

			}

		}
			}]);