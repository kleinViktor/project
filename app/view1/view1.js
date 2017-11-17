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
        var testRE = new RegExp('([a-zA-Z0-9]){1}'); // TODO check symbols count std: 4

        activate();

        vm.searchValue = '';
        vm.searchResults = [];
        vm.startSearch = function (event) {
            if (testRE.test(vm.searchValue)) {
                vm.searchResults = userService.searchAuthor(vm.searchValue);
            }
        };

        vm.createMode = true;

        vm.newName = '';
        vm.newSname = '';
        vm.newDate = '';
        vm.newUserBooks = [];
        vm.create = function () {
            userService.createAuthor(vm.newName, vm.newSname, vm.newDate, vm.newUserBooks, vm.updateUserID);
            vm.updateUserID = undefined;
            initCreateForm();
        };

        vm.openForm = false;
        vm.openFormTrigger = function () {
            vm.openForm = !vm.openForm;
        };

        vm.editAuthor = function (author) {
            vm.createMode = false;
            vm.newName = author.name;
            vm.newSname = author.sname;
            vm.newDate = new Date(author.date);
            vm.updateUserID = author.id;
        };

        function activate() {
            userService.initStorage();
            initCreateForm();
        }

        function initCreateForm() {
            vm.newName = '';
            vm.newSname = '';
            vm.newDate = '';
            vm.newUserBooks = [];
        }

    })

    .factory('userService', function ($localStorage) {
        var service = {
            initStorage: initStorage,
            createAuthor: createAuthor,
            createBook: createBook,
            searchAuthor: searchAuthor
        };

        return service;

        function initStorage() {
            $localStorage.authors = $localStorage.authors || [];
            $localStorage.books = $localStorage.books || [];
            $localStorage.authorId = $localStorage.authorId || $localStorage.authors.length + 1;
            $localStorage.booksId = $localStorage.booksId || $localStorage.books.length + 1;
        }

        function createAuthor(name, sname, date, books, id) {
            var author = {};


            if (id) {
                $localStorage.authors.forEach(function (item) {
                    if (item.id === id) {
                        item.name = name;
                        item.sname = sname;
                        item.date = date;
                        item.books = books || [];
                    }
                });
            } else {
                author.name = name;
                author.sname = sname;
                author.date = date;
                author.books = books || [];
                author.id = createId();
                $localStorage.authors.push(author);
            }

            function createId() {
                var id = $localStorage.authorId;
                $localStorage.authorId = $localStorage.authorId + 1;
                return id;
            }

        }

        function createBook(name, style, pages, authorId) {
            var book = {};

            book.name = name;
            book.style = style;
            book.pages = pages || 0;
            book.author = authorId;
            book.id = createId();

            function createId() {
                var id = $localStorage.booksId;
                $localStorage.booksId = $localStorage.booksId + 1;
                return id;
            }

            $localStorage.books.push(book);

        }

        function searchAuthor(param) {
            var searchReg;
            return $localStorage.authors.filter(function (item) {
                if (/[0-9]+/.test(param)) {
                    searchReg = new RegExp(param, 'gi');
                    return searchReg.test(item.id);
                }
                if (/[a-zA-Z]+/.test(param)) {
                    searchReg = new RegExp(param, 'gi');
                    return searchReg.test(item.name) || searchReg.test(item.sname);
                }
            });
        }
    });