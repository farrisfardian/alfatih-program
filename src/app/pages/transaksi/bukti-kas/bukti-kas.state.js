(function () {
    'use strict';

    angular
            .module('Alfatih.pages.transaksi')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('transaksi.bkm', {
                    url: '/bkm/:id',
                    templateUrl: 'app/pages/transaksi/bukti-kas/bukti-kas-jqw.html',
                    controller: 'BuktiKasController',
                    controllerAs: 'vm',
                    title: 'Transaksi Penerimaan Kas/ Bank',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Entri Bukti Kas'
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
                .state('akuntansi.daftar.list-bukti-kas', {
                    url: '/list-bukti-kas',
                    templateUrl: 'app/pages/akuntansi/daftar/buktiKas/list-bukti-kas.html',
                    controller: 'ListBuktiKasController',
                    controllerAs: 'vm',
                    title: 'Daftar Bukti Kas',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar BuktiKas'
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
