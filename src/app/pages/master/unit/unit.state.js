(function () {
    'use strict';
    angular
            .module('Alfatih.pages.master')
            .config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {
        $stateProvider
                .state('master.unit', {
//                    parent: 'akademik.daftar',
                    url: '/unit',
                    templateUrl: 'app/pages/master/unit/unit.html',
                    controller: 'UnitController',
                    controllerAs: 'vm',
                    data: {
                        authorities: ['ROLE_AKADEMIK', 'ROLE_ADMIN'],
                        pageTitle: 'unit'
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
    }
})();
