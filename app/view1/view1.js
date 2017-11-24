'use strict';

angular
    .module('myApp.view1', ['myApp.services'])
    .controller('View1Ctrl', function (userService) {
        var vm = this;
        var testRE = new RegExp('([a-zA-Z]){3}'); // TODO check symbols count std: 3

        activate();

        vm.searchValue = '';
        vm.searchResults = userService.getAllAuthors();
        vm.initCreateForm = initCreateForm;
        vm.startSearch = function (event) {
            if (testRE.test(vm.searchValue) || !isNaN(vm.searchValue)) {
                vm.searchResults = userService.searchAuthor(vm.searchValue);
            }
        };

        vm.createMode = true;

        vm.newName = '';
        vm.newSname = '';
        vm.newDate = '';
        vm.newUserBooks = [];
        vm.create = function () {
            userService.createAuthor(vm.newName, vm.newSname, vm.newDate, vm.newUserBooks, vm.updateUserID);
            vm.updateUserID = undefined;
            initCreateForm();
        };

        vm.editAuthor = function (author) {
            vm.createMode = false;
            vm.newName = author.name;
            vm.newSname = author.sname;
            vm.newDate = new Date(author.date);
            vm.updateUserID = author.id;
        };

        function activate() {
            userService.initStorage();
            initCreateForm();
        }

        function initCreateForm() {
            vm.createMode = true;
            vm.newName = '';
            vm.newSname = '';
            vm.newDate = '';
            vm.newUserBooks = [];
            vm.updateUserID = undefined;
        }

    });