(function () {
    'use strict';

    angular.module('Alfatih.pages.akuntansi.daftar')
            .controller('TahunAjaranController', TahunAjaranController)

    /** @ngInject */
    function TahunAjaranController($scope, $uibModal, $log, toastr, TahunAjaranService,
            ParseLinks, AlertService, paginationConstants, pagingParams, $state) {
        var vm = this;
        vm.search = '';vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.baru = baru;
        vm.ubah = ubah;
        vm.hapus = hapus;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        loadAll();

        function loadAll() {
            TahunAjaranService.query({
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
                console.log('vm.data', vm.data);
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
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/akuntansi/daftar/tahunAjaran/tahun-ajaran-dialog.html',
                controller: 'TahunAjaranDialogController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    entity: function () {
                        return {id: null};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                loadAll();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        ;

        function ubah(x) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/akuntansi/daftar/tahunAjaran/tahun-ajaran-dialog.html',
                controller: 'TahunAjaranDialogController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    entity: ['TahunAjaranService', function (TahunAjaranService) {
                            return TahunAjaranService.get({id: x.id}).$promise;
                        }],
                }
            });
            modalInstance.result.then(function (selectedItem) {
                loadAll()
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function hapus(x) {
            TahunAjaranService.delete({id: x.id}, function () {
                toastr.success('Hapus data sukses!');
                loadAll();
            });
        }
    }

})();

