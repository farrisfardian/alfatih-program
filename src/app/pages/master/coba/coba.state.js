(function () {
    'use strict';

    angular
            .module('Alfatih.pages.master')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('master.coba', {
                    url: '/coba',
                    title: 'Percobaan',
                    templateUrl: 'app/pages/master/coba/coba.html',
                    controller: 'CobaController',
                    controllerAs: 'vm',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Akun'
                    },
                    sidebarMeta: {
                        order: 100,
                    },
                })

    }

})();
