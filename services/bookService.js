'use strict';

angular
    .module('myApp.services.book', ['ngStorage'])
    .factory('bookService', function ($localStorage) {
        var service = {
            getAllBooks: getAllBooks,
            getBook: getBook,
            updateBook: updateBook,
            deleteBook: deleteBook,
            createBook: createBook,
            initCheckBookStorage: initCheckBookStorage
        };

        return service;

        function initCheckBookStorage() {
            $localStorage.books = $localStorage.books || [null];
        }

        function getAllBooks() {
            return $localStorage.books;
        }

        function getBook(id) {
            return _.find($localStorage.books, function (i) {
                if (!_.isNull(i)) {
                    return i.id === id;
                }
                return false;
            });
        }

        function createBook(book) {
            var newBook = {};
            _.merge(newBook, book);
            newBook.id = $localStorage.books.length;
            $localStorage.books.push(newBook);
            return newBook.id;
        }

        function deleteBook(id) {
            delete $localStorage.books[id];
        }

        function updateBook(id, data) {
            $localStorage.books[id] = data;
        }
    });