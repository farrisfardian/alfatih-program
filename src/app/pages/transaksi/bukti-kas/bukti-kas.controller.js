(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('BuktiKasController', BuktiKasController)

    /** @ngInject */
    function BuktiKasController($scope, $uibModal, $log, toastr, BuktiKasService, MataUangService, EnumService, AkunService, ParseLinks, AlertService, paginationConstants, pagingParams, UnitService, $state, $stateParams) {
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
        vm.lookupAkunMaster = lookupAkunMaster;
        vm.isBalance = isBalance;
        vm.cariAkunByKode = cariAkunByKode;
        vm.cariAkunMasterByKode = cariAkunMasterByKode;
        vm.save = save;
        vm.hapusItem = hapusItem;

        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        MataUangService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listMataUang', d);
            vm.listMataUang = d;
        });
        AkunService.cariSemua({id: 'kas-bank'}, function (d) {
            console.log('vm.listKasBank', d);
            vm.listKasBank = d;
        });
        UnitService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listUnit', d);
            vm.listUnit = d;
        });
        EnumService.tipeBuktiKas().success(function (d) {
            console.log('vm.listTipeBuktiKas', d);
            vm.listTipeBuktiKas = d;
        });

        function loadAll() {
            BuktiKasService.query({
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
            toastr.success('Simpan BuktiKas sukses!');
            vm.isSaving = true;
            clear();
        }

        function onSaveError(data) {
            console.log('onSaveError data', data);
            toastr.error(data.headers('X-alfatihApp-error'));
            toastr.error('Simpan BuktiKas gagal!');
            vm.isSaving = false;
        }

        function save() {
            console.log('vm.akun', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null && vm.data.id !== undefined) {
                BuktiKasService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                BuktiKasService.save(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function clear() {
            vm.data = {
                id: null,
                tanggal: new Date()
            };
        }

        function initForm(id) {
            BuktiKasService.get({id: id},
                    function (data) {
                        vm.data = data;
                        toastr.success("Bukti Kas ditemukan");
                    },
                    function (data) {
                        toastr.error("Bukti Kas tidak ditemukan");
                    }
            );
        }
        function tambahDetail() {
            if (vm.data.listDetail == null) {
                vm.data.listDetail = [];
            }
            vm.data.listDetail.push({
                akun: null, jumlah: 0.0, rate: null, mataUang: null
            });
        }
        function lookupAkun(index) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkun/lookup-akun.html',
                controller: 'LookupAkunController',
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
                vm.data.listDetail[index].akun = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function lookupAkunMaster() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkun/lookup-akun.html',
                controller: 'LookupAkunController',
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
                vm.data.akun = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function isBalance() {
            var d = vm.data.multiCurrency === true ? vm.data.jumlah * vm.data.rate : vm.data.jumlah;
            var k = 0;
            if (vm.data.listDetail == null) {
                return false;
            } else {
                for (var i = 0; i < vm.data.listDetail.length; i++) {
                    k += vm.data.multiCurrency === true ? vm.data.listDetail[i].jumlah * vm.data.listDetail[i].rate : vm.data.listDetail[i].jumlah;
                }
            }
            if (d === k) {
                return true;
            } else {
                return false;
            }
        }

        function cariAkunByKode(kode, idx) {
            console.log('cariAkunByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                vm.data.listDetail[idx].akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function cariAkunMasterByKode(kode) {
            console.log('cariAkunMasterByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                vm.data.akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function hapusItem(idx) {
            $scope.vm.data.listDetail.splice(idx, 1);
        }

        console.log('data edit', $stateParams);
        if ($stateParams.id === null || $stateParams.id === undefined || $stateParams.id === 0 || $stateParams.id === '') {
            vm.clear();
        } else {
            initForm($stateParams.id);
        }
    }

})();

