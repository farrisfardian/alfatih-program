(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('JurnalController', JurnalController)

    /** @ngInject */
    function JurnalController($scope, $uibModal, $log, toastr, JurnalService, MataUangService, AkadDonaturService, JenisJurnalService, AkunService, ProgramService, ParseLinks, AlertService, paginationConstants, pagingParams, DokumenSumberService, CabangService, $state, $stateParams) {
        var vm = this;
        vm.search = '';
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.tambahDetail = tambahDetail;
        vm.lookupAkun = lookupAkun;
        vm.isBalance = isBalance;
        vm.cariAkunByKode = cariAkunByKode;
        vm.save = save;
        vm.hapusItem = hapusItem;
        vm.baru = baru;
        vm.ubah = ubah;

        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
//        MataAnggaranService.cariSemua({id: 'all'}, function (d) {
//            console.log('vm.listMataAnggaran', d);
//            vm.listMataAnggaran = d;
//        });
        MataUangService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listMataUang', d);
            vm.listMataUang = d;
        });
        AkadDonaturService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listAkadDonatur', d);
            vm.listAkadDonatur = d;
        });
        JenisJurnalService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listJenisJurnal', d);
            vm.listJenisJurnal = d;
        });
        ProgramService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listProgram', d);
            vm.listProgram = d;
        });
        DokumenSumberService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listDokumenSumber', d);
            vm.listDokumenSumber = d;
        });
        CabangService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listCabang', d);
            vm.listCabang = d;
        });

        function loadAll() {
            JurnalService.query({
                id: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : 'filter',
                cari: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : vm.search,
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.data = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function onSaveSuccess(result) {
            console.log('onSaveSuccess', result);
            toastr.success('Simpan Jurnal sukses!');
            vm.isSaving = true;
            clear();
        }

        function onSaveError() {
            toastr.error('Simpan Jurnal gagal!');
            vm.isSaving = false;
        }

        function save() {
            console.log('vm.data', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null) {
                JurnalService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                JurnalService.save(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function clear() {
            vm.data = {
                tanggal: new Date()
            };
        }

        function initForm(id) {
            console.log('initForm executed')
            JurnalService.get({id: id},
                    function (data) {
                        vm.data = data;
                        toastr.success("Jurnal ditemukan");
                    },
                    function (data) {
                        toastr.error("Jurnal tidak ditemukan");
                    }
            );
        }
        function tambahDetail() {
            if (vm.data.listJurnalDetail == null) {
                vm.data.listJurnalDetail = [];
            }
            vm.data.listJurnalDetail.push({
                akun: null, mataAnggaran: null, dk: null, jumlah: 0.0, rate: null, mataUang: null
            });
        }
        function lookupAkun(index) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkunEndpoint/lookup-akun.html',
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
                vm.data.listJurnalDetail[index].akun = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function isBalance() {
            var d = 0;
            var k = 0;
            if (vm.data.listJurnalDetail == null) {
                return false;
            } else {
                for (var i = 0; i < vm.data.listJurnalDetail.length; i++) {
                    if (vm.data.listJurnalDetail[i].dk === "D") {
                        d += vm.data.multiCurrency === true ? vm.data.listJurnalDetail[i].jumlah * vm.data.listJurnalDetail[i].rate : vm.data.listJurnalDetail[i].jumlah;
                    } else {
                        k += vm.data.multiCurrency === true ? vm.data.listJurnalDetail[i].jumlah * vm.data.listJurnalDetail[i].rate : vm.data.listJurnalDetail[i].jumlah;
                    }
                }
                if (d === k) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function cariAkunByKode(kode, idx) {
            console.log('cariAkunByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                vm.data.listJurnalDetail[idx].akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function hapusItem(idx) {
            $scope.vm.data.listJurnalDetail.splice(idx, 1);
        }

        function baru() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/transaksi/jurnal/jurnal-detail-dialog.html',
                controller: 'JurnalDetailDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entity: function () {
                        return {id: null};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                if (vm.data.listJurnalDetail == null) {
                    vm.data.listJurnalDetail = [];
                }
                vm.data.listJurnalDetail.push(selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function ubah(x, idx) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/transaksi/jurnal/jurnal-detail-dialog.html',
                controller: 'JurnalDetailDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entity: x
                }
            });
            modalInstance.result.then(function (selectedItem) {
                vm.data.listJurnalDetail[idx] = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        console.log('data edit', $stateParams);
        if ($stateParams.id === null || $stateParams.id === undefined || $stateParams.id === "0" || $stateParams.id === '') {
            vm.clear();
        } else {
            initForm($stateParams.id);
        }
    }

})();

