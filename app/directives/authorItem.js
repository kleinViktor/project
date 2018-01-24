"use strict";

angular
    .module('directives.auth.item', [])
    .directive('authorItem', function () {
        return {
            restrict: 'E',
            scope: {
                author: "="
            },
            bindController: true,
            templateUrl: 'directives/views/authorItem.html',
            controller: function ($scope, $rootScope) {
                $scope.openEditModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'EDIT',
                        author: $scope.author
                    })
                }

                $scope.DeleteModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'DELETE',
                        id: $scope.author.id
                    })
                }
            }
        };
    });