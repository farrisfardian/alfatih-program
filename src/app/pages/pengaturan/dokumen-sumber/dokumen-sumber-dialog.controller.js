(function () {
    'use strict';

    angular.module('Alfatih.pages.pengaturan')
            .controller('DokumenSumberDialogController', DokumenSumberDialogController);

    function DokumenSumberDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, DokumenSumberService) {
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
            $scope.modalTitle = "Tambah Dokumen Sumber"
        } else {
            $scope.modalTitle = "Edit Dokumen Sumber"
        }

        function save () {
            console.log('vm.akun', vm.akun);
            vm.isSaving = true;
            if (vm.akun.id !== null) {
                DokumenSumberService.update(vm.akun, onSaveSuccess, onSaveError);
            } else {
                DokumenSumberService.save(vm.akun, onSaveSuccess, onSaveError);
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

