'use strict';

//***************************** our services for app
angular
    .module('myApp.services', [
        'ngStorage',
        'myApp.services.book',
        'myApp.services.author'])
    .factory('dataService', function ($localStorage, bookService, authorService) {
        var service = {
            initStorage: initStorage,
            createAuthor: authorService.createAuthor,
            searchAuthor: searchAuthor,
            getAllAuthors: getAllAuthors,
            updateAuthor: authorService.updateAuthor,
            deleteAuthor: authorService.deleteAuthor,
            getAuthor: authorService.getAuthor,
            createBook: bookService.createBook,
            searchBook: searchBook,
            getAllBooksByID: getAllBooksByID,
            getAllBooks: getAllBooks,

            mergBookAndAuthorIDs: mergBookAndAuthorIDs
        };

        var BOOKS = service.getAllBooks();
        var AUTHORS = service.getAllAuthors();

        return service;

        function initStorage() {
            authorService.initCheckAuthorStorage();
            bookService.initCheckBookStorage();
        }

        function getAllAuthors() {
            return _.cloneDeep(authorService.getAllAuthors());
        }

        function getAllBooks() {
            return _.cloneDeep(bookService.getAllBooks());
        }

        function searchAuthor(param) {
            var searchReg;

            if (param === '') {
                return [];
            }
            return AUTHORS.filter(function (item) {
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

        function searchBook(param) {
            var searchReg;

            if (param === '') {
                return [];
            }
            return BOOKS.filter(function (item) {
                searchReg = new RegExp(param, 'gi');
                return searchReg.test(item.name);
            });
        }

        function getAllBooksByID(id) {
            return BOOKS.filter(function (item) {
                return item.author === id;
            });
        }

        function mergBookAndAuthorIDs(authorID, bookID) {

            AUTHORS.forEach(function (item) {
                if (item.id === authorID) {
                    item.books.push(bookID);
                }
            });

            BOOKS.forEach(function (item) {
                if (item.id === bookID) {
                    item.author = authorID;
                }
            });
        }
    });
