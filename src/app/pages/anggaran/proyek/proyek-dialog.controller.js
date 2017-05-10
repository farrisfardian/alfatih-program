(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekDialogController', ProyekDialogController);

    function ProyekDialogController($http, $timeout, $scope, $stateParams, $uibModalInstance, $uibModal, $log, entity, ProyekService, TahunAjaranService) {
        var ctrl = this;

        ctrl.akun = entity;
        ctrl.listTahunAjaran = [];
        ctrl.clear = clear;
        ctrl.save = save;
        ctrl.lookupProyek = lookupProyek;
        console.log('ctrl.akun', ctrl.akun);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
//        $http.get('api/master/tahun-ajaran/all').success(function (d) {
//            console.log('data', d);
//            ctrl.listTahunAjaran = d;
//        });
        TahunAjaranService.cariSemua({id: 'all'}, function (d) {
            console.log('data', d);
            ctrl.listTahunAjaran = d;
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        if (entity.id === null) {
            $scope.modalTitle = "Tambah Proyek"
        } else {
            $scope.modalTitle = "Edit Proyek"
        }

        function save() {
            console.log('ctrl.akun', ctrl.akun);
            ctrl.isSaving = true;
            if (ctrl.akun.id !== null) {
                ProyekService.update(ctrl.akun, onSaveSuccess, onSaveError);
            } else {
                ProyekService.save(ctrl.akun, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            console.log('onSaveSuccess', result);
            $scope.$emit('Alfatih:akunUpdate', result);
            $uibModalInstance.close(result);
            ctrl.isSaving = false;
        }

        function onSaveError() {
            ctrl.isSaving = false;
        }
        
        function lookupProyek() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupProyekTree/lookup-program-tree.html',
                controller: 'LookupProyekTreeController',
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
                ctrl.akun.parent = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


    }
})();

