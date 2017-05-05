(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekDialogController', ProyekDialogController);

    function ProyekDialogController($http, $timeout, $scope, $stateParams, $uibModalInstance, $uibModal, $log, entity, ProgramService, TahunAjaranService) {
        var vm = this;

        vm.akun = entity;
        vm.listTahunAjaran = [];
        vm.clear = clear;
        vm.save = save;
        vm.lookupProgram = lookupProgram;
        console.log('vm.akun', vm.akun);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
//        $http.get('api/master/tahun-ajaran/all').success(function (d) {
//            console.log('data', d);
//            vm.listTahunAjaran = d;
//        });
        TahunAjaranService.cariSemua({id: 'all'}, function (d) {
            console.log('data', d);
            vm.listTahunAjaran = d;
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        if (entity.id === null) {
            $scope.modalTitle = "Tambah Program"
        } else {
            $scope.modalTitle = "Edit Program"
        }

        function save() {
            console.log('vm.akun', vm.akun);
            vm.isSaving = true;
            if (vm.akun.id !== null) {
                ProgramService.update(vm.akun, onSaveSuccess, onSaveError);
            } else {
                ProgramService.save(vm.akun, onSaveSuccess, onSaveError);
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
                vm.akun.parent = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


    }
})();

