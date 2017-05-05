(function () {
    'use strict';

    angular
            .module('Alfatih')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('akuntansi.daftar.tahun-ajaran', {
                    url: '/tahun-ajaran',
                    templateUrl: 'app/pages/akuntansi/daftar/tahunAjaran/tahun-ajaran.html',
                    controller: 'TahunAjaranController',
                    controllerAs: 'vm',
                    title: 'Daftar Tahun Ajaran',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Tahun Ajaran'
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
