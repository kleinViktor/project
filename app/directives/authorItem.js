"use strict";

angular
    .module('directives.auth.item', [])
    .directive('authorItem', function () {
        return {
            restrict: 'E',
            scope: {
                author: '=',
                upList: '='
            },
            bindController: true,
            templateUrl: 'directives/views/authorItem.html',
            controller: function ($scope, $rootScope, dataService) {
                $scope.openEditModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'EDIT',
                        author: $scope.author
                    })
                }

                $scope.openDeleteModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'DELETE',
                        author: $scope.author
                    });
                }

                $scope.addNewBookToAuthor = function () {

                }

                $scope.books = [];
                $scope.author.books.forEach(function (id) {
                    $scope.books.push(dataService.getBook(id));
                });
                
                $scope.unsubscribeBook = function (bookID) {
                    dataService.unsubscribeBookAndAuthor($scope.author.id, bookID);
                    $scope.upList();
                }
            }
        };
    });