(function () {
    'use strict';

    angular
            .module('Alfatih.pages.pengaturan')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('pengaturan.jenis-jurnal', {
                    url: '/jenis-jurnal',
                    templateUrl: 'app/pages/pengaturan/jenis-jurnal/jenis-jurnal.html',
                    controller: 'JenisJurnalController',
                    controllerAs: 'vm',
                    title: 'Daftar Jenis Jurnal',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Jenis Jurnal'
                    },
                    sidebarMeta: {
                        order: 100,
                    },
                    params: {
                        page: {
                            value: '1',
                            squash: true
                        },
                        sort: {
                            value: 'id,asc',
                            squash: true
                        },
                        search: null
                    },
                    resolve: {
                        pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                                return {
                                    page: PaginationUtil.parsePage($stateParams.page),
                                    sort: $stateParams.sort,
                                    predicate: PaginationUtil.parsePredicate($stateParams.sort),
                                    ascending: PaginationUtil.parseAscending($stateParams.sort),
                                    search: $stateParams.search
                                };
                            }]
                    }
                });
    }

})();
