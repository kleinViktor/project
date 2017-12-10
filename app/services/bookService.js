'use strict';

angular
    .module('myApp.services', ['ngStorage'])
    .factory('bookService', function ($localStorage) {
        var service = {
            getBook: getBook,
            updateBook: updateBook,
            deleteBook: deleteBook,
            createBook: createBook
        };

        return service;

        function getBook(id) {
            return _.find($localStorage.books, function (i) {
                return i.id === id;
            };
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