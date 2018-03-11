'use strict';

angular
    .module('myApp.Books', [
        'myApp.services',
        'constants.book.styles',
        'directives.book.add.edit',
        'directives.book.item'
    ])
    .controller('booksCtrl', function ($window, $rootScope, dataService, BOOK_STYLES) {
        var vm = this;

        activate();

        function activate() {
            setBooks();
            vm.bookSearchValue = '';
            vm.booksStyles = BOOK_STYLES;
            vm.openNewBookDialog = openNewBookDialog
            vm.dialogType = '';
            vm.book = {};
            initBook();

            vm.authors = dataService.getAllAuthors(true);
            vm.createBook = createBook;
            vm.updateBook = updateBook;

            vm.actCb = actCb;
            vm.yesCb = yesCb;
            vm.modHd = modHd;

            $window.$("#dialogBook").dialog({
                autoOpen: false,
                height: 450,
                width: 350,
                modal: true
            });
        }

        $rootScope.$on('OPEN_MODAL', modalParser);

        function modalParser(event, params) {
            if (params.dialogType) {
                vm.dialogType = params.dialogType;
                if (params.book) {
                    _.merge(vm.book, params.book);
                    vm.book.date = new Date(vm.book.date);
                } else {
                    return;
                }
                $window.$("#dialogBook").dialog("open");
            }
        }

        function createBook() {
            var newBookId = dataService.createBook(vm.book);
            if (vm.book.authorId) {
                dataService.subscribeBookAndAuthor(vm.book.authorId, newBookId)
            }
            $window.$("#dialogBook").dialog("close");
            setBooks();
        }

        function openNewBookDialog() {
            vm.dialogType = 'ADD';
            initBook();
            $window.$("#dialogBook").dialog("open");
        }

        function setBooks() {
            vm.books = dataService.getAllBooks();
        }

        function initBook() {
            vm.book.name = '';
            vm.book.style = 'NONE';
            vm.book.pages = 0;
            vm.book.authorId = "0";
        }

        function updateBook() {
            dataService.updateBook(vm.book.id, vm.book)
            $window.$("#dialogBook").dialog("close");
            setBooks();
        }

        function actCb() {
            $window.$("#dialogBook").dialog("close");
        }

        function yesCb() {
            dataService.deleteBook(vm.book.id);
            setBooks();
        }

        function modHd() {
            return 'Delete book ' + vm.book.name + '?';
        }
    });

