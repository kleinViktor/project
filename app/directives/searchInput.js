"use strict";

angular
    .module('directives', [])
    .directive('searchInput', function () {
        return {
            restrict: 'E',
            scope: {
                type: "=",
                inputData: '=',
                searchAction: '='
            },
            bindController: true,
            templateUrl: 'directives/views/searchInput.html',
            controller: function ($scope, $timeout) {
                console.log(arguments);

                $timeout(null, 100).then(function () {
                    $('input.' + $scope.type).autocomplete({
                        data: $scope.inputData,
                        limit: 5,
                        onAutocomplete: function (val) {
                           $scope.searchAction(val);
                        },
                        minLength: 1
                    });
                });
            }
        };
    });