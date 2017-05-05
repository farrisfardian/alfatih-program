(function () {
    'use strict';

    angular
            .module('Alfatih.pages.transaksi')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('transaksi.jurnal', {
                    url: '/jurnal/:id',
                    templateUrl: 'app/pages/transaksi/jurnal/jurnal.html',
                    controller: 'JurnalController',
                    controllerAs: 'vm',
                    title: 'Entri Jurnal',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Entri Jurnal'
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
                    },
                    scope: {
                        isBalance: '='
                    }
                })
                .state('transaksi.list-jurnal', {
                    url: '/list-jurnal',
                    templateUrl: 'app/pages/akuntansi/daftar/jurnal/list-jurnal.html',
                    controller: 'ListJurnalController',
                    controllerAs: 'vm',
                    title: 'Daftar Jurnal',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Jurnal'
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
