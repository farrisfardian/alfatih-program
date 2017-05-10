(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekController', ProyekController)

    /** @ngInject */
    function ProyekController($scope, $uibModal, $log, $timeout, $TreeDnDConvert, toastr, ProyekService,
            ParseLinks, AlertService, paginationConstants, pagingParams, $state) {
        var vm = this;
        vm.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        vm.data = {
            durasiAwal: new Date(),
            durasiAkhir: new Date(),
        };
        vm.lookupProgram = lookupProgram;
        vm.tree = {};
        vm.baru = baru;
        vm.ubah = ubah;
        vm.hapus = hapus;
        vm.tambahSub = tambahSub;
        vm.tree_data = {};
        vm.my_tree = vm.tree = {};
        vm._filter = {};
        vm.listProyek = [];
        vm.resetAllFlat = resetAllFlat;


        vm.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'ID'
        };
        vm.col_defs = [
            {
                field: 'keterangan',
                displayName: 'Keterangan',
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate: '<span><bold>{{node.budget|number}}</bold></span>'
            },
            {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a href="" ng-click="vm.ubah(node)" > <i class="glyphicon glyphicon-edit"></i> </a>  &nbsp; \n\
                                <a href="" ng-confirm-message="Anda yakin akan menghapus Program \'{{node.nama}}\'?" ng-confirm="vm.hapus(node)" ng-show="node.__children__.length===0"> <i class="glyphicon glyphicon-remove"></i> </a> &nbsp; \n\
                                <a href="" ng-click="vm.tambahSub(node)" > <i class="glyphicon glyphicon-plus"></i> </a>'
            }
        ];

        function resetAllFlat() {
            vm.tree_data = {};
            vm.my_tree = vm.tree = {};
        }
        function loadAllFlat() {
            ProyekService.query({id: 'list-flat-by-program', cari: vm.data.program.id}, onSuccess, onError);
            function onSuccess(data) {
                vm.tree_data = {};
                vm.my_tree = vm.tree = {};
                vm.dataFlat = (data === null || data.length === 0) ? [] : data;
                console.log('vm.dataFlat', vm.dataFlat);
                vm.tree_data = $TreeDnDConvert.line2tree(vm.dataFlat, 'id', 'id_parent');
            }
            function onError(error) {
                AlertService.error(error.data.message);
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
                vm.data.program = selectedItem;
                console.log('vm.data.program', vm.data.program);
                loadAllFlat();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function baru() {
            if (vm.data.program == undefined || vm.data.program == null) {
                toastr.error('Silahkan Pilih Program Dahulu!');
            } else {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                    controller: 'ProyekDialogController',
                    controllerAs: 'ctrl',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {id: null, program: vm.data.program};
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    loadAllFlat();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }

        function ubah(x) {
            if (vm.data.program == undefined || vm.data.program == null) {
                toastr.error('Silahkan Pilih Program Dahulu!');
            } else {
                console.log('Open modal');
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                    controller: 'ProyekDialogController',
                    controllerAs: 'ctrl',
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
        }

        function hapus(x) {
            ProyekService.delete({id: x.id},
                    function () {
                        toastr.success('Hapus data sukses!');
                        loadAllFlat();
                    },
                    function () {

                    }
            );
        }

        function tambahSub(x) {
            var sub = {id: null, parent: null, program: vm.data.program};
            ProyekService.get({id: x.id}, onSuccess, onError);
            function onSuccess(data) {
                sub.parent = data;
                console.log('sub', sub);
            }
            function onError(error) {
                AlertService.error(error);
            }
            $timeout(function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                    controller: 'ProyekDialogController',
                    controllerAs: 'ctrl',
                    size: 'lg',
                    resolve: {
                        entity: sub
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    loadAllFlat();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }, 300);

        }
    }

})();

