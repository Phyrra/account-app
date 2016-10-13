app
	.service('FontAwesomeIconService', ['FontAwesome', function(FontAwesome) {
		this.getIcons = function() {
			return FontAwesome.getIcons();
		};
	}]);