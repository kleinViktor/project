'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            controllerAs: 'ctrl'
        });
    }])

    .controller('View1Ctrl', function (userService) {
        var vm = this;
        var testRE = new RegExp('([a-zA-Z0-9]){4}');

        activate();

        vm.authorNameSearch = '';

        vm.startSearch = function (event) {
            if (testRE.test(vm.authorNameSearch)) {
                alert('aaa!');
            }
        };
        vm.newName = '';
        vm.newSname = '';
        vm.newDate = '';
        vm.create = function () {
            userService.createAuthor(vm.newName, vm.newSname, vm.newDate);
            initCreateForm();
        };

        vm.openForm = false;
        vm.openFormTrigger = function () {
            vm.openForm = !vm.openForm;
        };

        function activate() {
            userService.initStorage();
            initCreateForm();
        }

        function initCreateForm() {
            vm.newName = '';
            vm.newSname = '';
            vm.newDate = '';
        }

    })

    .factory('userService', function ($localStorage) {
        var service = {
            initStorage: initStorage,
            createAuthor: createAuthor
        };

        return service;

        function initStorage() {
            $localStorage.authors = $localStorage.authors || [];
            $localStorage.books = $localStorage.books || [];
            $localStorage.authorId = $localStorage.authorId || $localStorage.authors.length;
            $localStorage.bookId = $localStorage.bookId || $localStorage.books.length;
        }

        function createAuthor(name, sname, date, books) {
            var author = {};

            author.name = name;
            author.sname = sname;
            author.date = date;
            author.books = books || [];
            author.id = createId();

            function createId() {
                var id = $localStorage.authorId;
                $localStorage.authorId = $localStorage.authorId + 1;
                return id;
            }

            $localStorage.authors.push(author);

        }
    });