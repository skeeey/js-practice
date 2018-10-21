/* global angular */

(function () {
    'use strict';

    angular.module('services.storage').factory('storage', storageFactory);

    storageFactory.$inject = ['$log', '$sessionStorage', '$localStorage'];
    
    function storageFactory($log, $sessionStorage, $localStorage) {
        return {
            add: add,
            get: get,
            addToLocal: addToLocal,
            getFromLocal: getFromLocal,
            cleanAll: cleanAll
            
        };

        function add(key, value) {
            $sessionStorage[key] = value;
        }

        function get(key) {
            return $sessionStorage[key];
        }

        function addToLocal(key, value) {
            $localStorage[key] = value;
        }

        function getFromLocal(key) {
            return $localStorage[key];
        }

        function cleanAll() {
            $sessionStorage.$reset();
            $localStorage.$reset();
        }
    }
})();