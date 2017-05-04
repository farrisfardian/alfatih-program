(function () {
    'use strict';

    angular
            .module('Alfatih')
            .factory('Menu', Menu);

    Menu.$inject = ['$rootScope', '$http'];

    function Menu($rootScope, $http) {
        var service = {
            loadMenu: loadMenu
        };

        return service;

        function loadMenu() {
            $http.get('api/menu-list')
                    .then(function seccessCallback(d) {
                        console.log('load menu');
                        console.log('success', d);
                        $rootScope.menuItems = d.data;
                        $rootScope.defaultSidebarState = $rootScope.menuItems[0].stateRef;
                    }, function errorCallback(response) {
                        $rootScope.menuItems = [];
                        console.log('error', response);
                        if (response.status = 401) {
                        }
                    });
        }


    }
})();
