'use strict';

//***************************** our services for app
angular
    .module('myApp.services', [
        'myApp.services.book',
        'myApp.services.author'])
    .factory('dataService', function (bookService, authorService) {
        var service = {
            initStorage: initStorage,
            subscribeBookAndAuthor: subscribeBookAndAuthor,
            unsubscribeBookAndAuthor: unsubscribeBookAndAuthor,

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

        var BOOKS = service.getAllBooks;
        var AUTHORS = service.getAllAuthors;

        return service;

// GENERAL methods
        function initStorage() {
            authorService.initCheckAuthorStorage();
            bookService.initCheckBookStorage();
        }

        function subscribeBookAndAuthor(authorID, bookID) {
            var BOOKS = service.getAllBooks();
            var AUTHORS = service.getAllAuthors();

            var upAuthor = AUTHORS[authorID];
            upAuthor.books.push(bookID);
            service.updateAuthor(authorID, upAuthor);

            var upBook = BOOKS[bookID];
            upBook.authorId = authorID;
            service.updateBook(bookID, upBook);
        }

        function unsubscribeBookAndAuthor(authorID, bookID) {
            var BOOKS = service.getAllBooks();
            var AUTHORS = service.getAllAuthors();

            AUTHORS[authorID].books.forEach(function (book, i) {
                if (book === bookID) {
                    var upAuthor = AUTHORS[authorID];
                    upAuthor.books[i] = null;
                    service.updateAuthor(authorID, upAuthor);
                }
            });

            var upBook = BOOKS[bookID];
            upBook.authorId = 0;
            service.updateBook(bookID, upBook)
        }

// AUTHORS methods
        function getAllAuthors() {
            return _.cloneDeep(authorService.getAllAuthors());
        }

        function searchAuthor(param) {
            var AUTHORS = service.getAllAuthors();
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
            var BOOKS = service.getAllBooks();
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
            var BOOKS = service.getAllBooks();
            return BOOKS.filter(function (item) {
                return item.authorId === id;
            });
        }
    });
