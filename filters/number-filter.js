app
	.filter('number', function() {
		return function(number, precision) {
			var precision = parseInt(precision || '2', 10);

			var s = parseFloat(number)
				.toFixed(precision)
				.toString();

			var start = s.indexOf('.');
			var stop = s.charAt(0) === '-' ? 1 : 0;

			for (var i = start - 3; i > stop; i -= 3) {
				s = s.substring(0, i) + '\'' + s.substring(i);
			}

			return s;
		};
	});