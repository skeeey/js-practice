/* global angular */

(function () {
    'use strict';

    angular.module('services.security').factory('security', securityFactory);

    securityFactory.$inject = ['storage'];

    function securityFactory(storage) {
        return {
            permissions: permissions,
            authenticate: authenticate,
            isAuthenticated: isAuthenticated,
            getCurrentUser: getCurrentUser,
            hasPermission: hasPermission,
            clean: clean
        };

        function permissions() {
            return {
                operations: {
                    view: 'VIEW',
                    ctrl: 'CONTROL',
                    config: 'CONFIG'
                },
                resources: {
                    allLeaves: 'ALL_Leaves',
                    allGrains: 'ALL_Grains'
                }
            };
        }

        function authenticate(authVModel, successCallback, failCallback) {
            if (authVModel.username === 'test0' && authVModel.password === 'test') {
                storage.add('currentUser', {'user': authVModel.username});
                successCallback();
            } else if (authVModel.username === 'test1' && authVModel.password === 'test') {
                storage.add('currentUser', {'user': authVModel.username});
                successCallback();
            } else {
                failCallback();
            }
        }

        function isAuthenticated() {
            var currentUser = storage.get('currentUser');
            if (currentUser) {
                return true;
            }
            return false;
        }

        function  getCurrentUser() {
            return storage.get('currentUser') || storage.getFromLocal('currentUser');
        }

        function hasPermission(expectedPermission) {
            if (!expectedPermission) {
                return false;
            }
            var currentUser = storage.get('currentUser');
            if (!currentUser) {
                return false;
            }
            return currentUser.user === 'test0';
        }

        function clean() {
            storage.cleanAll();
        }
    }
})();