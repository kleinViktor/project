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
                return i.id === id;
            });
        }

        function createAuthor(author) {
            var newAuthor = {};
            _.merge(newAuthor, author);
            newAuthor.id = $localStorage.authors.length;
            $localStorage.authors.push(newAuthor);
        }

        function deleteAuthor(id) {
            $localStorage.authors[id] = {};
        }

        function updateAuthor(id, data) {
            $localStorage.authors[id] = data;
        }

        function initCheckAuthorStorage() {
            $localStorage.authors = $localStorage.authors || [];
        }
    });