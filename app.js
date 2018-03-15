'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ncy-angular-breadcrumb',
    'myApp.services',
    'myApp.Authors',
    'myApp.Books'
]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/authors/list');

    $stateProvider.state('authors', {
        url: '/authors',
        abstract: true
    });

    $stateProvider.state('authors.list', {
        url: '/list',
        templateUrl: 'Authors/authors.html',
        controller: 'authorsCtrl',
        controllerAs: 'authCtrl',
        ncyBreadcrumb: {
            label: 'authors'
        }
    });

    $stateProvider.state('authors.edit', {
        url: '/edit/{authorId}',
        templateUrl: 'Authors/authors.html',
        controller: 'authorsCtrl',
        controllerAs: 'authCtrl'
    });

    $stateProvider.state('books', {
        url: '/books',
        templateUrl: 'Books/books.html',
        controller: 'booksCtrl',
        controllerAs: 'bksCtrl',
        ncyBreadcrumb: {
            label: 'books'
        }
    });
}).run(function (dataService){
    dataService.initStorage();
});

