"use strict";

angular
    .module('directives.auth.add.edit', [])
    .directive('addEditAuthor', function () {
        return {
            restrict: 'E',
            scope: {
                type: "=",
                author: "="
            },
            bindController: true,
            templateUrl: 'directives/views/addEditAuthor.html',
            controller: function ($scope) {
                switch ($scope.type) {
                    case 'ADD':
                        addAuthor();
                        break;
                    case 'EDIT':
                        editAuthor($scope.author);
                        break;
                }

                function addAuthor() {

                }

                function editAuthor(author) {

                }
            }
        };
    });