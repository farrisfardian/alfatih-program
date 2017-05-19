(function () {
    'use strict';

    angular
            .module('Alfatih.pages.laporan')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('laporan.keuangan', {
                    url: '/keuangan',
                    title: 'Laporan Keuangan',
                    templateUrl: 'app/pages/laporan/keuangan/lap-keuangan.html',
                    controller: 'LaporanKeuanganController',
//                    controllerAs: 'vm',
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
