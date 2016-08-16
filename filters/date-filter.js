app
	.filter('date', function() {
		return function(date) {
			var pad = function(num) {
				var s = num.toString();

				if (s.length === 1) {
					return '0' + s;
				}

				return s;
			};

			return pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + '.' + date.getFullYear();
		};
	});