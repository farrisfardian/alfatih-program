(function () {
    'use strict';

    angular
            .module('Alfatih.pages.transaksi')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('transaksi.posting', {
                    url: '/posting',
                    templateUrl: 'app/pages/transaksi/posting/posting-jqw.html',
                    controller: 'PostingJqwController',
                    controllerAs: 'vm',
                    title: 'Posting',
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Posting'
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
                });
    }

})();
