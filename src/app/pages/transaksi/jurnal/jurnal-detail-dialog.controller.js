(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('JurnalDetailDialogController', JurnalDetailDialogController);

    function JurnalDetailDialogController($timeout, $scope, $stateParams, $uibModalInstance, $uibModal, $log, entity, AkunService, toastr) {
        var ctrl = this;

        ctrl.data = entity;
        ctrl.listJenis = [];
        ctrl.clear = clear;
        ctrl.save = save;
        ctrl.lookupAkadDonatur = lookupAkadDonatur;
        ctrl.lookupProyek = lookupProyek;
        ctrl.lookupAkun = lookupAkun;
        ctrl.cariAkunByKode = cariAkunByKode;
        $scope.modalTitle = (entity.akun === null || entity.akun === undefined)?"Tambah Detail Jurnal":"Ubah Detail Jurnal";
        console.log('ctrl.data', ctrl.data);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            console.log('ctrl.data', ctrl.data);
            $uibModalInstance.close(ctrl.data);
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

        function cariAkunByKode(kode) {
            console.log('cariAkunByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                ctrl.data.akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function lookupProyek() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookup-proyek/lookup-proyek.html',
                controller: 'LookupProyekController',
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
                ctrl.data.mataAnggaran = selectedItem;

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function lookupAkun() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkunEndpoint/lookup-akun-endpoint.html',
                controller: 'LookupAkunEndpointController',
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
                ctrl.data.akun = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function lookupAkadDonatur() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkadDonatur/lookup-akad-donatur.html',
                controller: 'LookupAkadDonaturController',
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
                ctrl.data.akadDonatur = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


    }
})();

