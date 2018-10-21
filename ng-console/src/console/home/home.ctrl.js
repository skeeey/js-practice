/* global angular */

(function () {
    'use strict';

    angular.module('console.home').controller('HomeCtrl', HomeCtrl);
    
    HomeCtrl.$inject = ['$log', '$state', 'security'];
    
    function HomeCtrl($log, $state, security) {
        var vm = this;
        vm.showDashboard = function () {
            return security.hasPermission(['view_all_grains', 'view_all_leaves']);
        };
        var states = $state.current.name.split(/\./);
        vm.currentState = {
            type: states.length === 1 ? 'dashboard' : states[1],
            name: states.length === 3 ? states[2] : null
        };
        vm.changeState = function (stateType, stateName) {
            vm.currentState = {
                type: stateType,
                name: stateName
            };
        };
        vm.logout = function () {
            security.clean();
            $state.go('login');
        };
    }
})();