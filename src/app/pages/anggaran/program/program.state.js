(function () {
    'use strict';

    angular
            .module('Alfatih.pages.anggaran')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('anggaran.program', {
                    url: '/program',
                    templateUrl: 'app/pages/anggaran/program/program.html',
                    controller: 'ProgramController',
                    controllerAs: 'vm',
                    title: 'Anggaran Program',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Program'
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
                })
                .state('anggaran.program-jqw', {
                    url: '/program-jqw',
                    templateUrl: 'app/pages/anggaran/program/program-jqw.html',
                    controller: 'ProgramJqwController',
                    controllerAs: 'vm',
                    title: 'Anggaran Program',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Program'
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
