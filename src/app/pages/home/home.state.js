(function () {
    'use strict';

    angular
            .module('Alfatih.pages')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            data: {
                authorities: []
            },
            templateUrl: 'app/pages/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        });
    }
})();
