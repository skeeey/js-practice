/* global angular */

(function () {
    'use strict';

    angular.module('console.leaves').controller('TasksCtrl', Controller);
    
    Controller.$inject = [];
    
    function Controller() {
        var vm = this;
        vm.content = 'Tasks';
    }
})();