(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('AkadDonaturDialogController', AkadDonaturDialogController);

    function AkadDonaturDialogController($timeout, $scope, $uibModal, $stateParams, $log, $uibModalInstance, entity, AkadDonaturService, CabangService) {
        var vm = this;

        vm.data = entity;
        vm.listJenis = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupProgram = lookupProgram;
        vm.lookupDonatur = lookupDonatur;
        vm.modalTitle = vm.data == undefined || vm.data.id == null ? "Tambah AkadDonatur" : "Ubah AkadDonatur";
        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        CabangService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listCabang', d);
            vm.listCabang = d;
        });

        function save() {
            console.log('vm.akun', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null) {
                AkadDonaturService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                AkadDonaturService.save(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            console.log('onSaveSuccess', result);
            $scope.$emit('Alfatih:akunUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        function lookupProgram() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupProgramEndpoint/lookup-program-endpoint.html',
                controller: 'LookupProgramEndpointController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    lookupPagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
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
            modalInstance.result.then(function (selectedItem) {
                vm.data.program = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        
        function lookupDonatur() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupDonatur/lookup-donatur.html',
                controller: 'LookupDonaturController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    lookupPagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
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
            modalInstance.result.then(function (selectedItem) {
                vm.data.donatur = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    }
})();

