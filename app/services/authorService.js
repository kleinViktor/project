'use strict';

angular
    .module('myApp.services', ['ngStorage'])
    .factory('authorService', function ($localStorage) {
        var service = {
            getAuthor: getAuthor,
            updateAuthor: updateAuthor,
            deleteAuthor: deleteAuthor,
            createAuthor: createAuthor
        };

        return service;

        function getAuthor(id) {
            return _.find($localStorage.authors, function (i) {
                return i.id === id;
            };
        }

        function createAuthor(name, surname, birthday) {
            var newAuthor = {
              nane: name,
              sname: surname,
              date: birthday,
              id: $localStorage.authors.length
            };
            $localStorage.authors.push(newAuthor);
        }

        function deleteAuthor(id) {
            $localStorage.authors[id] = {};
        }

        function updateAuthor(id, data) {
            $localStorage.authors[id] = data;
        }
    });