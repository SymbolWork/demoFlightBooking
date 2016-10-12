var app = angular.module('myapp', [
    'ui.router',
    'myapp.router',
    'myapp.controllers',
	  'myapp.factories',
    'myapp.directive'
]);
 Array.prototype.remove = function(val, all) {
        var i, removedItems = [];
        if (all) {
          for(i = this.length; i--;){
            if (this[i] === val) removedItems.push(this.splice(i, 1));
          }
        }
        else {  //same as before...
          i = this.indexOf(val);
          if(i>-1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
