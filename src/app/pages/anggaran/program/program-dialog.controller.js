(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProgramDialogController', ProgramDialogController);

    function ProgramDialogController($http, $timeout, $scope, $stateParams, $uibModalInstance, $uibModal, $log, entity, ProgramService, TahunAjaranService) {
        var vm = this;
        console.log('entity', entity);
        vm.errorKodeExists = null;
        vm.data = entity;
        vm.listTahunAjaran = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupProgram = lookupProgram;
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });
        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
//        $http.get('api/master/tahun-ajaran/all').success(function (d) {
//            console.log('data', d);
//            vm.listTahunAjaran = d;
//        });
        TahunAjaranService.cariSemua({id: 'all'}, function (d) {
            vm.listTahunAjaran = d;
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        if (entity.id === null) {
            $scope.modalTitle = "Tambah Program";
            console.log('vm.data.id==null', vm.data);
//            console.log('vm.data.parent.nama', vm.data.parent.nama);
            vm.data = {
                tglMulai: new Date(),
                tglSelesai: new Date(),
                aktif: true,
                kode: vm.data.parent == undefined || vm.data.parent == null ? '' : vm.data.parent.kode,
                tahunAjaran: vm.data.parent == undefined || vm.data.parent == null ? null : vm.data.parent.tahunAjaran,
                parent: vm.data.parent
            };
        } else {
            $scope.modalTitle = "Edit Program";


        }

        function save() {
            vm.isSaving = true;
            console.log('simpan vm.data', vm.data);
            if (vm.data.id === undefined || vm.data.id === null) {
                ProgramService.save(vm.data, onSaveSuccess, onSaveError);;
            } else {
                console.log('update', vm.data)
                ProgramService.update(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            console.log('onSaveSuccess', result);
            $scope.$emit('Alfatih:akunUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError(response) {
            console.log('error', response.headers('x-alfatihapp-error'))
            vm.isSaving = false;
            vm.success = null;
            if (response.status === 400 && response.headers('x-alfatihapp-error') === 'Kode sudah digunakan') {
                vm.errorKodeExists = 'ERROR';
            } else {
                vm.error = 'ERROR';
            }
        }

        function lookupProgram() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupProgramTree/lookup-program-tree.html',
                controller: 'LookupProgramTreeController',
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

