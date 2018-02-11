"use strict";

angular
    .module('directives.auth.delete', [])
    .directive('deleteAuthor', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/views/deleteAuthor.html',
            controller: 'authorsCtrl'
        };
    });