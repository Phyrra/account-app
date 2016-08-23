app
	.filter('date', function() {
		return function(date, style) {
			var pad = function(num) {
				var s = num.toString();

				if (s.length === 1) {
					return '0' + s;
				}

				return s;
			};

			switch (style) {
				case 'iso':
					return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
				default:
					return pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + '.' + date.getFullYear();
			};
		};
	});