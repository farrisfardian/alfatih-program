	(function () {
		'use strict';

		angular.module('Alfatih.pages.pengaturan')
		        .controller('UnitDialogController', UnitDialogController);

		function UnitDialogController($timeout, $scope, $uibModal, $stateParams, $log, $uibModalInstance, entity, UnitService, CabangService) {
		    var vm = this;

		    vm.data = entity;
		    vm.listJenis = [];
		    vm.clear = clear;
		    vm.save = save;
		    vm.modalTitle = vm.data == undefined || vm.data.id == null ? "Tambah Unit" : "Ubah Unit";
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
		            UnitService.update(vm.data, onSaveSuccess, onSaveError);
		        } else {
		            UnitService.save(vm.data, onSaveSuccess, onSaveError);
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


		}
	})();

