/* global angular */

(function () {
    'use strict';

    angular.module('console.grains').controller('TagsCtrl', Controller);
    
    Controller.$inject = [];
    
    function Controller() {
        var vm = this;
        vm.content = 'Tags';
    }
})();