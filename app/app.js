'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ncy-angular-breadcrumb',
    'myApp.Authors',
    'myApp.Books'
]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/authors');
    $stateProvider.state('list', {
        url: '/authors',
        templateUrl: 'Authors/authors.html',
        controller: 'authorsCtrl',
        controllerAs: 'authCtrl',
        ncyBreadcrumb: {
            label: 'Authors'
        }
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
});

