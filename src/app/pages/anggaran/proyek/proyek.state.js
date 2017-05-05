(function () {
    'use strict';

    angular
            .module('Alfatih.pages.anggaran')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('anggaran.proyek', {
                    url: '/proyek',
                    templateUrl: 'app/pages/anggaran/proyek/proyek.html',
                    controller: 'ProyekController',
                    controllerAs: 'vm',
                    title: 'Proyek',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Proyek'
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
