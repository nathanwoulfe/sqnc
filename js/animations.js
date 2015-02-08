angular.module('sqncAnimations', ['ngAnimate'])

.animation('.pulsate', function () {
	var getScope = function (e) {
		return angular.element(e).scope();
	};

	return {
		addClass: function (element, className, done) {
			jQuery(element).animate({
				'opacity': '.2'
			}, done);
		},
		removeClass: function (element, className, done) {
			jQuery(element).animate({
				'opacity': '1'
			})
		}
	}
});