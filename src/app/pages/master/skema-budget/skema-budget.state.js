(function () {
    'use strict';

    angular
            .module('Alfatih.pages.master')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('skema-budget', {
                    parent: 'master',
                    url: '/skema-budget',                    
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Daftar Skema Budget'
                    },
                    views: {
                        'content@': {
                            templateUrl: 'app/pages/master/skema-budget/skema-budget.html',
                            controller: 'SkemaBudgetController',
                            controllerAs: 'vm',
                        }
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
