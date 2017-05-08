(function () {
    'use strict';

    angular
            .module('Alfatih.pages.pengaturan')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('pengaturan.dokumen-sumber', {
                    url: '/dokumen-sumber',
                    templateUrl: 'app/pages/pengaturan/dokumen-sumber/dokumen-sumber.html',
                    controller: 'DokumenSumberController',
                    controllerAs: 'vm',
                    title: 'Daftar Dokumen Sumber',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Dokumen Sumber'
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
