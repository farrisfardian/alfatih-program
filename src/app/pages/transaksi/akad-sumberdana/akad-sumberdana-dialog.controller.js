(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('AkadSumberDanaDialogController', AkadSumberDanaDialogController);

    function AkadSumberDanaDialogController($timeout, $scope, $uibModal, $stateParams, $log, $uibModalInstance, entity, AkadSumberDanaService, CabangService) {
        var vm = this;

        vm.data = entity;
        vm.listJenis = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupProgram = lookupProgram;
        vm.lookupSumberDana = lookupSumberDana;
        vm.modalTitle = vm.data == undefined || vm.data.id == null ? "Tambah Akad Sumber Dana" : "Ubah Akad Sumber Dana";
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
                AkadSumberDanaService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                AkadSumberDanaService.save(vm.data, onSaveSuccess, onSaveError);
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
        
        function lookupSumberDana() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupSumberDana/lookup-sumberdana.html',
                controller: 'LookupSumberDanaController',
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
                vm.data.sumberDana = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    }
})();

