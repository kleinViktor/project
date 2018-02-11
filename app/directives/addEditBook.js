"use strict";

angular
    .module('directives.book.add.edit', [])
    .directive('addEditBook', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/views/addEditBook.html',
            controller: 'booksCtrl'
        };
    });