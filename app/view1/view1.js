'use strict';

angular
    .module('myApp.view1', ['myApp.services'])
    .controller('View1Ctrl', function (userService) {
        var vm = this;
        var testRE = new RegExp('([a-zA-Z]){3}'); // TODO check symbols count std: 3

        activate();

        function activate() {
            userService.initStorage();
            initCreateForm();
            initCreateBookForm();
        }

        vm.searchValue = '';
        // vm.searchResults = userService.getAllAuthors(); TODO if need all list of authors
        vm.initCreateForm = initCreateForm;
        vm.initCreateBookForm = initCreateBookForm;
        vm.startSearch = function () {
            if (testRE.test(vm.searchValue) || !isNaN(vm.searchValue)) {
                vm.searchResults = userService.searchAuthor(vm.searchValue);
            }
        };

        vm.searchBook = '';
        vm.searchBookResults = [];
        vm.startSearchBook = function () {
            vm.searchBookResults = userService.searchBook(vm.searchBook);
        };

        vm.createMode = true;
        vm.createBookMode = true;

        vm.newName = '';
        vm.newSname = '';
        vm.newDate = '';
        vm.newUserBooks = [];

        vm.getAllBooksByID = userService.getAllBooksByID;
        vm.addBookToAuthor = function () {
          userService.mergBookAndAuthorIDs(vm.updateUserID, vm.idAddBook);
        };


        vm.create = function () {
            userService.createAuthor(vm.newName, vm.newSname, vm.newDate, vm.newUserBooks, vm.updateUserID);
            vm.updateUserID = undefined;
            initCreateForm();
        };

        vm.createBook = function () {
            userService.createBook(vm.newBookName, vm.newBookStyle, vm.newBookPages, vm.newBookAuthorId, vm.updateBookID);
            vm.updateBookID = undefined;
            initCreateBookForm();
        };

        vm.editAuthor = function (author) {
            vm.createMode = false;
            vm.newName = author.name;
            vm.newSname = author.sname;
            vm.newDate = new Date(author.date);
            vm.updateUserID = author.id;
            vm.idAddBook = undefined;
        };

        vm.editBook = function (book) {
            vm.createBookMode = false;
            vm.newBookName = book.name;
            vm.newBookStyle = book.style;
            vm.newBookPages = book.pages;
            vm.newBookAuthorId = book.author;
            vm.updateBookID = book.id;
        };

        function initCreateForm() {
            vm.createMode = true;
            vm.newName = '';
            vm.newSname = '';
            vm.newDate = '';
            vm.newUserBooks = [];
            vm.updateUserID = undefined;
        }

        function initCreateBookForm() {
            vm.createBookMode = true;
            vm.newBookName = '';
            vm.newBookStyle = '';
            vm.newBookPages = '';
            vm.newBookAuthorId = undefined;
            vm.updateBookID = undefined;
        }

    });