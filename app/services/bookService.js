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
            $localStorage.books = $localStorage.books || [];
        }

        function getAllBooks() {
            return $localStorage.books;
        }

        function getBook(id) {
            return _.find($localStorage.books, function (i) {
                return i.id === id;
            });
        }

        function createBook(name, style, pages) {
            var newBook = {
                nane: name,
                style: style,
                pages: pages,
                id: $localStorage.books.length
            };
            $localStorage.books.push(newBook);
        }

        function deleteBook(id) {
            $localStorage.books[id] = {};
        }

        function updateBook(id, data) {
            $localStorage.books[id] = data;
        }
    });