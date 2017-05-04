(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .controller('AkunDialogController', AkunDialogController);

    function AkunDialogController($timeout, $scope, $stateParams, $uibModalInstance, $log, $uibModal, entity, AkunService, KelompokAkunService) {
        var vm = this;

        vm.akun = entity;
        vm.listJenis = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupAkun = lookupAkun;
        console.log('vm.akun', vm.akun);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });
        if (entity.id === null) {
            $scope.modalTitle = "Tambah Akun"
        } else {
            $scope.modalTitle = "Edit Akun"
        }

        KelompokAkunService.cariSemua().success(function (d) {
            vm.listJenis = d;
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            console.log('vm.akun', vm.akun);
            vm.isSaving = true;
            if (vm.akun.id !== null) {
                AkunService.update(vm.akun, onSaveSuccess, onSaveError);
            } else {
                AkunService.save(vm.akun, onSaveSuccess, onSaveError);
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

        function lookupAkun() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkunTree/lookup-akun-tree.html',
                controller: 'LookupAkunTreeController',
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
                vm.akun.parent = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }



    }
})();

