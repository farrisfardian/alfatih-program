(function () {
    'use strict';

    angular
            .module('Alfatih.theme.components')
            .controller('PageTopCtrl', PageTopCtrl);

    PageTopCtrl.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', '$rootScope', '$timeout', '$scope', 'Menu'];

    function PageTopCtrl($state, Auth, Principal, ProfileService, $rootScope, $timeout, $scope, Menu) {
        var vm = this;
        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });
        
        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;

        $timeout(function () {
            angular.element('#username').focus();
        }, 200);

        function cancel() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
        }

        function login(event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                        $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('dashboard');
                    vm.isNavbarCollapsed = false;
                }

//                $rootScope.$broadcast('Alfatih:refreshMenu', {});
        
                Menu.loadMenu();   
                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function requestResetPassword() {
            $state.go('requestReset');
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
//            $rootScope.$broadcast('Alfatih:refreshMenu', {});
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();
