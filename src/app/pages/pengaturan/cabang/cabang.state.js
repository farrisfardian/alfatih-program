(function () {
    'use strict';
    angular
            .module('Alfatih.pages.pengaturan')
            .config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {
        $stateProvider
                .state('pengaturan.cabang', {
                    url: '/cabang',
                    templateUrl: 'app/pages/pengaturan/cabang/cabang.html',
                    controller: 'CabangController',
                    controllerAs: 'vm',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Cabang'
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
