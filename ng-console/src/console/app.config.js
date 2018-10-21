/* global angular */

(function () {
    'use strict';
    
    angular.module('console').config(config);
    
    config.$inject = ['$translateProvider', '$urlRouterProvider', '$stateProvider'];
    
    function config($translateProvider, $urlRouterProvider, $stateProvider) {
        // i18n
        $translateProvider.translations('en_US', window.translations_en_us);
        $translateProvider.determinePreferredLanguage().fallbackLanguage('en_US');
        // avoid security issue, see http://t.cn/R5cDcYY
        $translateProvider.useSanitizeValueStrategy('escape');

        //router
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'console/home/home.tpl.html',
                controller: 'HomeCtrl',
                controllerAs: 'ctrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'console/login/login.tpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
            })
            .state('home.dashboard', {
                url: 'dashboard',
                templateUrl: 'console/dashboard/dashboard.tpl.html',
                controller: 'DashboardCtrl',
                controllerAs: 'ctrl',
                expectedPermissions: ['view_all_grains', 'view_all_leaves']
            })
            .state('home.grains', {
                abstract: true,
                url: 'grains',
                template: '<ui-view/>'
            })
            .state('home.grains.tags', {
                url: '/tags',
                templateUrl: 'console/grains/tags/tags.tpl.html',
                controller: 'TagsCtrl',
                controllerAs: 'ctrl',
            })
            .state('home.grains.bookmarks', {
                url: '/bookmarks',
                templateUrl: 'console/grains/bookmarks/bookmarks.tpl.html',
                controller: 'BookmarksCtrl',
                controllerAs: 'ctrl',
            })
            .state('home.leaves', {
                abstract: true,
                url: 'leaves',
                template: '<ui-view/>'
            })
            .state('home.leaves.tasks', {
                url: '/tasks',
                templateUrl: 'console/leaves/tasks/tasks.tpl.html',
                controller: 'TasksCtrl',
                controllerAs: 'ctrl'
            });
    }
})();