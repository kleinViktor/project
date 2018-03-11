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
            controller: function ($scope, $rootScope, dataService, $timeout) {
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

                $scope.subBooks = [];

                $scope.author.books.forEach(function (id) {
                    $scope.subBooks.push(dataService.getBook(id));
                });

                $scope.unsubscribeBook = function (bookID) {
                    dataService.unsubscribeBookAndAuthor($scope.author.id, bookID);
                    $scope.upList();
                    $scope.unSubBooks = getUnsubscribeBooks();
                };

                $scope.unSubBooks = getUnsubscribeBooks();

                function getUnsubscribeBooks() {
                    var arr = _.differenceBy(dataService.getAllBooks(true), $scope.subBooks, 'id');
                    return arr.filter(function (item) {
                        return item.authorId == 0;
                    });
                }

                $scope.selectUnSubscribeBook = 0;

                $scope.subscribeBook = function () {
                    if ($scope.selectUnSubscribeBook != 0) {
                        dataService.subscribeBookAndAuthor($scope.author.id, Number($scope.selectUnSubscribeBook));
                        $scope.upList();
                    }
                }

                // dataService.getAllBooks(true).forEach(function (item) {
                //     if (item.authorId !) {
                //
                //     }
                // });
            }
        };
    });