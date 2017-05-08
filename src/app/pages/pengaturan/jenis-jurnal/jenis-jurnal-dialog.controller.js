(function () {
    'use strict';

    angular.module('Alfatih.pages.pengaturan')
            .controller('JenisJurnalDialogController', JenisJurnalDialogController);

    function JenisJurnalDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, JenisJurnalService) {
        var vm = this;
        
        vm.akun = entity;
        vm.listJenis = [];
        vm.clear = clear;
        vm.save = save;
        console.log('vm.akun', vm.akun);
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }
        if (entity.id === null) {
            $scope.modalTitle = "Tambah Jenis Jurnal"
        } else {
            $scope.modalTitle = "Edit Jenis Jurnal"
        }

        function save () {
            console.log('vm.akun', vm.akun);
            vm.isSaving = true;
            if (vm.akun.id !== null) {
                JenisJurnalService.update(vm.akun, onSaveSuccess, onSaveError);
            } else {
                JenisJurnalService.save(vm.akun, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            console.log('onSaveSuccess', result);
            $scope.$emit('Alfatih:akunUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

