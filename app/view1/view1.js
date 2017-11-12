'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'ctrl'
  });
}])

.controller('View1Ctrl', [function() {
  var vm = this;

  vm.authorNameSearch = '';

  var testRE = new RegExp('([a-zA-Z0-9]){4}');
  vm.startSearch = function(event) {
    if(testRE.test(vm.authorNameSearch)){
        alert('aaa!');
    }
  }



}]);