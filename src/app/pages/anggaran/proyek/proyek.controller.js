(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekController', ProyekController)

    /** @ngInject */
    function ProyekController($scope, $uibModal, $log, $TreeDnDConvert, toastr, ProyekService, 
            ParseLinks, AlertService, paginationConstants, pagingParams, $state) {
        var vm = this;
        vm.search = '';
        vm.loadAll = loadAll;
        vm.loadAllFlat = loadAllFlat;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.baru = baru;
        vm.ubah = ubah;
        vm.hapus = hapus;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.tree = {};
        vm.tree_data = {};
        vm.my_tree = vm.tree = {};
        vm._filter = {};
        vm.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'nama',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'Nama'
        };
        vm.col_defs = [
            {
                field: 'kode',
                displayName: 'Kode'
            },
            {
                field: 'tgl_mulai',
                displayName: 'Tgl Mulai',
                cellTemplate:'<span><bold>{{node.tgl_mulai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'tgl_selesai',
                displayName: 'Tgl Selesai',
                cellTemplate:'<span><bold>{{node.tgl_selesai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'aktif',
                displayName: 'Aktif'
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate:'<span><bold>{{node.budget|number}}</bold></span>'
            },
            {
                field: 'kode_tahun_ajaran',
                displayName: 'Tahun Ajaran'
            },
            {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a href="" ng-click="vm.ubah(node)" > <i class="glyphicon glyphicon-edit"></i> </a>  &nbsp; <a href="" ng-confirm-message="Anda yakin akan menghapus Program \'{{node.nama}}\'?" ng-confirm="vm.hapus(node)"> <i class="glyphicon glyphicon-remove"></i> </a>'
            }
        ];

//        loadAll();
        loadAllFlat();

        function loadAllFlat() {
            ProyekService.cariSemua({id: 'list-flat'}, onSuccess, onError);
            function onSuccess(data) {
                vm.dataFlat = data;
                console.log('vm.dataFlat', vm.dataFlat);
                vm.tree_data = $TreeDnDConvert.line2tree(vm.dataFlat, 'id', 'id_parent');
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadAll() {
            ProyekService.query({
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

        function baru() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                controller: 'ProgramDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    entity: function () {
                        return {id: null};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                loadAllFlat();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        ;

        function ubah(x) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                controller: 'ProyekDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    entity: ['ProyekService', function (ProyekService) {
                            return ProyekService.get({id: x.id}).$promise;
                        }],
                }
            });
            modalInstance.result.then(function (selectedItem) {
                loadAllFlat()
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function hapus(x) {
            ProyekService.delete({id: x.id}).success(function () {
                toastr.success('Hapus data sukses!');
                loadAll();
            });
        }
    }

})();

