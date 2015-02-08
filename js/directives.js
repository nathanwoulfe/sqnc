'use strict';

/* Directives */
angular.module('sqncDirectives', [])

.directive('pulsator', function ($animate) {
	return {
		link: function (scope, element, attrs) {
			element.on("click", function () {
				$animate.addClass(element, 'pulsate', function () {
					$animate.removeClass(element, 'pulsate')
				});
			});
		}

	}
});