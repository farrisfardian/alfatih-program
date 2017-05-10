(function () {
    'use strict';

    angular.module('Alfatih.pages.pengaturan')
            .controller('CabangDialogController', CabangDialogController);

    function CabangDialogController($timeout, $scope, $uibModal, $stateParams, $log, $uibModalInstance, entity, CabangService) {
        var vm = this;

        vm.data = entity;
        vm.listJenis = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupParent = lookupParent;
        vm.modalTitle = vm.data == undefined || vm.data.id == null ? "Tambah Cabang" : "Ubah Cabang";
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            console.log('vm.akun', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null) {
                CabangService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                CabangService.save(vm.data, onSaveSuccess, onSaveError);
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
        
        function lookupParent() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupCabang/lookup-unit.html',
                controller: 'LookupCabangController',
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
                vm.data.parent = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


    }
})();

