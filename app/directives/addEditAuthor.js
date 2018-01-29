"use strict";

angular
    .module('directives.auth.add.edit', [])
    .directive('addEditAuthor', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/views/addEditAuthor.html',
            controller: 'authorsCtrl'
        };
    });