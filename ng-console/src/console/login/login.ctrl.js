/* global angular */

(function () {
    'use strict';

    angular.module('console.login').controller('LoginCtrl', LoginCtrl);
    
    LoginCtrl.$inject = ['$log', '$state', 'security'];
    
    function LoginCtrl($log, $state, security) {
        var vm = this;
        
        vm.login = login;
        
        var successCallback = function () {
            $state.go('home');
        };
        
        var failCallback = function () {
            vm.failed = true;
        };
        
        function login() {
            if (vm.username && vm.password) {
                security.authenticate(vm, successCallback, failCallback);
            } else {
                vm.failed = true;
            }
        }
    }
})();