(function () {
    'use strict';
    angular.module('Alfatih')
            .controller('LookupSantriController', LookupSantriController);
    function LookupSantriController($timeout, $stateParams, $uibModalInstance, $scope, $uibModal, $log, toastr, ParseLinks, AlertService, paginationConstants, lookupPagingParams, $state, SantriService) {

        var ctrl = this;
        ctrl.search = '';
        ctrl.loadAll = loadAll;
        ctrl.loadPage = loadPage;
        ctrl.predicate = lookupPagingParams.predicate;
        ctrl.reverse = lookupPagingParams.ascending;
        ctrl.transition = transition;
        ctrl.itemsPerPage = paginationConstants.itemsPerPage;
        ctrl.select = select;
        $scope.modalTitle = "Cari Santri";
        loadAll();
        function loadAll() {
            SantriService.query({
                id: (ctrl.search === null || ctrl.search === undefined || ctrl.search === '') ? '' : 'filter-endpoint',
                cari: (ctrl.search === null || ctrl.search === undefined || ctrl.search === '') ? '' : ctrl.search,
                page: lookupPagingParams.page - 1,
                size: ctrl.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [ctrl.predicate + ',' + (ctrl.reverse ? 'asc' : 'desc')];
                if (ctrl.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                ctrl.links = ParseLinks.parse(headers('link'));
                ctrl.totalItems = headers('X-Total-Count');
                ctrl.queryCount = ctrl.totalItems;
                ctrl.data = data;
                ctrl.page = lookupPagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            ctrl.page = page;
            ctrl.transition();
        }

        function transition() {
            lookupPagingParams.page = ctrl.page;
            lookupPagingParams.sort = ctrl.predicate + ',' + (ctrl.reverse ? 'asc' : 'desc');
            lookupPagingParams.search = ctrl.currentSearch;
            loadAll();
//            $state.transitionTo($state.$current, {
//                page: ctrl.page,
//                sort: ctrl.predicate + ',' + (ctrl.reverse ? 'asc' : 'desc'),
//                search: ctrl.currentSearch
//            });
        }
        console.log('ctrl.akun', ctrl.akun);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        function select(x) {
            console.log('onSelect', x);
            ctrl.isSaving = false;
            $uibModalInstance.close(x);
        }
    }
})();

