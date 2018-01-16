'use strict';

//***************************** our services for app
angular
    .module('myApp.services', [
        'myApp.services.book',
        'myApp.services.author'])
    .factory('dataService', function (bookService, authorService) {
        var service = {
            initStorage: initStorage,
            mergBookAndAuthorIDs: mergBookAndAuthorIDs,

            createAuthor: authorService.createAuthor,
            updateAuthor: authorService.updateAuthor,
            deleteAuthor: authorService.deleteAuthor,
            getAuthor: authorService.getAuthor,
            searchAuthor: searchAuthor,
            getAllAuthors: getAllAuthors,

            createBook: bookService.createBook,
            deleteBook: bookService.deleteBook,
            updateBook: bookService.updateBook,
            getBook: bookService.getBook,
            searchBook: searchBook,
            getAllBooksByID: getAllBooksByID,
            getAllBooks: getAllBooks
        };

        var BOOKS = service.getAllBooks();
        var AUTHORS = service.getAllAuthors();

        return service;
// GENERAL methods
        function initStorage() {
            authorService.initCheckAuthorStorage();
            bookService.initCheckBookStorage();
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
// AUTHORS methods
        function getAllAuthors() {
            return _.cloneDeep(authorService.getAllAuthors());
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
 // BOOKS methods
        function getAllBooks() {
            return _.cloneDeep(bookService.getAllBooks());
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
    });
