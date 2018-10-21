/* global angular */

(function () {
    'use strict';

    angular.module('console').run(startup);

    startup.$inject = ['$log', '$transitions', '$state', 'security'];

    function startup($log, $transitions, $state, security) {
        $transitions.onStart({}, function(transition) {
            var restrictedState = (transition.to().name !== 'login');
            if (restrictedState && !security.isAuthenticated()) {
                $state.go('login', {}, { reload: true });
                return false;
            }
            if (transition.to().expectedPermissions) {
                if (!security.hasPermission(transition.to().expectedPermissions)) {
                    $state.go('login', {}, { reload: true });
                    return false;
                }
            }
        });
        $transitions.onSuccess({}, function(transition) {
            if (transition.to().name === 'home') {
                var viewDashboard = security.hasPermission(['view_all_grains', 'view_all_leaves']);
                if (viewDashboard) {
                    $state.go('home.dashboard', {}, { reload: true });
                } else {
                    $state.go('home.grains.tags', {}, { reload: true });
                }
            }
        });
    }
})();