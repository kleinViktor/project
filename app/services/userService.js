'use strict';

//***************************** our services for app
angular
    .module('myApp.services', ['ngStorage'])
    .factory('userService', function ($localStorage) {
        var service = {
            initStorage: initStorage,
            createAuthor: createAuthor,
            searchAuthor: searchAuthor,
            getAllAuthors: getAllAuthors,
            createBook: createBook,
            searchBook: searchBook,
            getAllBooksByID: getAllBooksByID,
            mergBookAndAuthorIDs: mergBookAndAuthorIDs
        };

        return service;

 //**************************** this function getting authors from local storage
        function getAllAuthors() {
            return $localStorage.authors;
        }
//***************************** loading data from local storage
        function initStorage() {
            $localStorage.authors = $localStorage.authors || [];
            $localStorage.books = $localStorage.books || [];
            $localStorage.authorId = $localStorage.authorId || $localStorage.authors.length + 1;
            $localStorage.booksId = $localStorage.booksId || $localStorage.books.length + 1;
        }
//****************************** creating author with next parameters: name, sname, date, books and id
        function createAuthor(name, sname, date, books, id) {
            var author = {};

//****************************** using method for each to sort out our array
            if (id) {
                $localStorage.authors.forEach(function (item) {
                    if (item.id === id) {
                        item.name = name;
                        item.sname = sname;
                        item.date = date;
                        item.books = books || [];
                    }
                });
            } else {
                author.name = name;
                author.sname = sname;
                author.date = date;
                author.books = books || [];
                author.id = createId();
                $localStorage.authors.push(author);
            }

//***************************** creation an id for each author
            function createId() {
                var id = $localStorage.authorId;
                $localStorage.authorId = $localStorage.authorId + 1;
                return id;
            }

        }

//***************************** creation book with next parameters: name, style, pages, authorId and id
        function createBook(name, style, pages, authorId, id) {
            var book = {};

            if (id) {
                $localStorage.books.forEach(function (item) {
                    if (item.id === id) {
                        item.name = name;
                        item.style = style;
                        item.pages = pages || 0;
                        item.author = authorId;
                    }
                });
            } else {
                book.name = name;
                book.style = style;
                book.pages = pages || 0;
                book.author = authorId;
                book.id = createId();
            }

//***************************** creation an id for each book
            function createId() {
                var id = $localStorage.booksId;
                $localStorage.booksId = $localStorage.booksId + 1;
                return id;
            }

            $localStorage.books.push(book);

        }

//***************************** searching author
        function searchAuthor(param) {
            var searchReg;
            if(param === ''){
                return [];
            }
            return $localStorage.authors.filter(function (item) {
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

//***************************** searching book
        function searchBook(param) {
            var searchReg;
            if(param === ''){
                return [];
            }
            return $localStorage.books.filter(function (item) {
                searchReg = new RegExp(param, 'gi');
                return searchReg.test(item.name);
            });
        }

//***************************** getting all books by their id
        function getAllBooksByID(id) {
            return $localStorage.books.filter(function (item) {
                return item.author === id;
            });
        }

//***************************** merging book and author IDs
        function mergBookAndAuthorIDs(authorID, bookID) {
            $localStorage.authors.forEach(function (item) {
                if(item.id === authorID) {
                    item.books.push(bookID);
                }
            });

            $localStorage.books.forEach(function (item) {
                if(item.id === bookID) {
                    item.author = authorID;
                }
            });
        }
    });
