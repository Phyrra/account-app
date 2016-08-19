app
    .filter('pad', function() {
        return function(item, n, char) {
            if (angular.isUndefined(n)) {
                n = 2;
            } else {
                n = parseInt(n, 10);
            }

            if (angular.isUndefined(char)) {
                char = '0';
            }

            if (angular.isUndefined(item)) {
                item = '';
            }

            var result = item.toString();
            for (var i = 0; i < n - item.toString().length; ++i) {
                result = char + result;
            }

            return result;
        };
    });