var rangeFilter = angular.module('myapp.directive.rangeFilter', []);
rangeFilter.filter('rangeFilter', function() {
    return function( items, rangeInfo ) {
        var filtered = [];
        var min = parseInt(rangeInfo.min);
        var max = parseInt(rangeInfo.max);
        // If time is with the range
        angular.forEach(items, function(item) {
        	debugger;
            if( item.price >= min && item.price <= max ) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});
