/* global angular */

(function () {
    'use strict';

    angular.module('console.dashboard').controller('DashboardCtrl', Controller);
    
    Controller.$inject = [];
    
    function Controller() {
        var vm = this;
        vm.content = 'Dashboard';
    }
})();