"use strict";

angular
    .module('directives', [])
    .directive('authorItem', function () {
        return {
            restrict: 'E',
            scope: {
                author: "="
            },
            bindController: true,
            templateUrl: 'directives/views/authorItem.html',
            controller: function ($scope) {
                $scope.modalOpen = function () {
                    $('#modal1').modal('open');
                }
            }
        };
    });