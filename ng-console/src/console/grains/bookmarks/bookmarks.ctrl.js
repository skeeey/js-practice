/* global angular */

(function () {
    'use strict';

    angular.module('console.grains').controller('BookmarksCtrl', Controller);
    
    Controller.$inject = [];
    
    function Controller() {
        var vm = this;
        vm.content = 'Bookmarks';
    }
})();