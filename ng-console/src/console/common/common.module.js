/* global angular */

(function () {
    'use strict';

    angular.module('console.common', [
        /* services */
        'services.security',
        'services.storage',

        /* vendors */
        'ngStorage',
        'pascalprecht.translate',
        'ui.router'
    ]);
})();