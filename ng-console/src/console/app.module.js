/* global angular */

(function () {
    'use strict';

    angular.module('console', [
        /* vendors & services */
        'console.common',

        /* features */
        'console.login',
        'console.home',
        'console.dashboard',
        'console.grains',
        'console.leaves'
    ]);
})();