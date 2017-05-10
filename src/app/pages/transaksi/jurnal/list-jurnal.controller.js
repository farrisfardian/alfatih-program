(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('ListJurnalController', ListJurnalController)

    /** @ngInject */
    function ListJurnalController($scope, $window, $uibModal, $log, toastr, JurnalService, MataAnggaranService, MataUangService, SumberDanaService, JenisJurnalService, AkunService, ProgramService, ParseLinks, AlertService, paginationConstants, pagingParams, $state) {
        var vm = this;
        vm.search = '';
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.ubah = ubah;
        vm.baru = baru;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clean = clean;

        loadAll();

        function loadAll() {
            JurnalService.query({
                id: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : 'filter',
                cari: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : vm.search,
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.data = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function baru() {
            $window.open('#/akuntansi/daftar/jurnal/0', '_blank');
        }

        function ubah(x) {
            $window.open('#/akuntansi/daftar/jurnal/' + x.id, '_blank');
        }

        function clean() {
            vm.currentRecord = {
                tanggal: new Date()
            };
        }
    }

})();

