"use strict";

angular
    .module('directives.common.delete', [])
    .directive('deleteModal', function () {
        return {
            restrict: 'E',
            scope: {
                modalHeader: '=',
                yesCallBack: '=',
                actionCallBack: '='
            },
            templateUrl: 'directives/views/deleteModal.html',
            controller: function ($scope) {
                $scope.yesCase = function () {
                    $scope.yesCallBack();
                    $scope.actionCallBack();
                }

                $scope.noCase = function () {
                    $scope.actionCallBack();
                }
            }
        };
    });