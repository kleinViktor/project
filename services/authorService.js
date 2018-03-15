'use strict';

angular
    .module('myApp.services.author', ['ngStorage'])
    .factory('authorService', function ($localStorage) {
        var service = {
            getAuthor: getAuthor,
            getAllAuthors: getAllAuthors,
            updateAuthor: updateAuthor,
            deleteAuthor: deleteAuthor,
            createAuthor: createAuthor,
            initCheckAuthorStorage: initCheckAuthorStorage
        };

        return service;

        function getAllAuthors() {
            return $localStorage.authors;
        }

        function getAuthor(id) {
            return _.find($localStorage.authors, function (i) {
                if(_.isNull(i) || _.isUndefined(i)){
                    return false
                }
                return i.id === Number(id);
            });
        }

        function createAuthor(author) {
            var newAuthor = {};
            _.merge(newAuthor, author);
            newAuthor.id = $localStorage.authors.length;
            $localStorage.authors.push(newAuthor);
            return newAuthor.id;
        }

        function deleteAuthor(id) {
            delete $localStorage.authors[id];
        }

        function updateAuthor(id, data) {
            indexingBooksOfAuthor(data);
            $localStorage.authors[id] = data;
        }

        function initCheckAuthorStorage() {
            $localStorage.authors = $localStorage.authors || [null];
        }

        function indexingBooksOfAuthor(author) {
            var indxBooks = [];
            author.books.forEach(function (value) {
                if(!_.isNull(value) && !_.isUndefined(value) && _.isNumber(value)){
                    indxBooks.push(value);
                }
            });
            author.books = indxBooks;
        }
    });