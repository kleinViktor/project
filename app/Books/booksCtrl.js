'use strict';

//***************************** our view model presenter
angular
    .module('myApp.Books', ['myApp.services'])
    .controller('booksCtrl', function (dataService) {
        var vm = this;
        var testRE = new RegExp('([a-zA-Z]){3}'); // TODO check symbols count std: 3

        activate();

//***************************** geting data for a controller - use the controller’s activate function
        function activate() {
            dataService.initStorage();
            // initCreateForm();
            // initCreateBookForm();
        }

        vm.authors = formatStorageData(dataService.getAllAuthors());
        vm.search = search;

        function formatStorageData(data) {
            var formObj = {};

            data.forEach(function (item) {
                formObj[item.name + ' ' + item.sname] = null;
            });

            return formObj;
        }

        function search(searchValue) {
            var splitResult = _.split(searchValue, ' ', 2);

        }

//***************************** view model for searching author among other authors
        vm.searchValue = '';
        // vm.searchResults = dataService.getAllAuthors(); TODO if need all list of authors
        vm.initCreateForm = initCreateForm;
        vm.initCreateBookForm = initCreateBookForm;
        vm.startSearch = function () {
            if (testRE.test(vm.searchValue) || !isNaN(vm.searchValue)) {
                vm.searchResults = dataService.searchAuthor(vm.searchValue);
            }
        };

//***************************** view model for searching book
        vm.searchBook = '';
        vm.searchBookResults = [];
        vm.startSearchBook = function () {
            vm.searchBookResults = dataService.searchBook(vm.searchBook);
        };

//***************************** adding book to author
        vm.createMode = true;
        vm.createBookMode = true;

        vm.newName = '';
        vm.newSname = '';
        vm.newDate = '';
        vm.newUserBooks = [];

        vm.getAllBooksByID = dataService.getAllBooksByID;
        vm.addBookToAuthor = function () {
            dataService.mergBookAndAuthorIDs(vm.updateUserID, vm.idAddBook);
        };

//***************************** view model for creating author
        vm.create = function () {
            dataService.createAuthor(vm.newName, vm.newSname, vm.newDate, vm.newUserBooks, vm.updateUserID);
            vm.updateUserID = undefined;
            initCreateForm();
        };

//***************************** view model for creating a book
        vm.createBook = function () {
            dataService.createBook(vm.newBookName, vm.newBookStyle, vm.newBookPages, vm.newBookAuthorId, vm.updateBookID);
            vm.updateBookID = undefined;
            initCreateBookForm();
        };

//***************************** view model for editing an author
        vm.editAuthor = function (author) {
            vm.createMode = false;
            vm.newName = author.name;
            vm.newSname = author.sname;
            vm.newDate = new Date(author.date);
            vm.updateUserID = author.id;
            vm.idAddBook = undefined;
        };

//***************************** view model for editing a book
        vm.editBook = function (book) {
            vm.createBookMode = false;
            vm.newBookName = book.name;
            vm.newBookStyle = book.style;
            vm.newBookPages = book.pages;
            vm.newBookAuthorId = book.author;
            vm.updateBookID = book.id;
        };

//*****************************
        function initCreateForm() {
            vm.createMode = true;
            vm.newName = '';
            vm.newSname = '';
            vm.newDate = '';
            vm.newUserBooks = [];
            vm.updateUserID = undefined;
        }

//*****************************
        function initCreateBookForm() {
            vm.createBookMode = true;
            vm.newBookName = '';
            vm.newBookStyle = '';
            vm.newBookPages = '';
            vm.newBookAuthorId = undefined;
            vm.updateBookID = undefined;
        }

    });

