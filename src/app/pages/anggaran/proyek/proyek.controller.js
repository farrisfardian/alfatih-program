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
        vm.hitungSummary = hitungSummary;
        vm.tree_data = {};
        $scope.my_tree = vm.tree = {};
        vm._filter = {};
        vm.listProyek = [];
        vm.totalBudget = 0;

        vm.dummyData = [
            {
                "keterangan": "TES",
                "kode": "1",
                "id_program": 2,
                "id": 1,
                "id_parent": null,
                "budget": 0,
                "children": [
                    {
                        "keterangan": "TES CHILD",
                        "kode": "1.1",
                        "id_program": 2,
                        "id": 2,
                        "id_parent": 1,
                        "budget": 0,
                        "children": [
                            {
                                "keterangan": "TES GRAND CHILDS",
                                "kode": "1.1.1",
                                "id_program": 2,
                                "id": 4,
                                "id_parent": 2,
                                "budget": 120000,
                                "uid": "0.07055019347612435",
                                "parent_uid": "0.1693920711782113",
                                "children": [],
                                "expanded": true,
                                "level": 3
                            },
                            {
                                "keterangan": "dasdasd",
                                "kode": "1.1.2",
                                "id_program": 2,
                                "id": 7,
                                "id_parent": 2,
                                "budget": 0,
                                "children": [
                                    {
                                        "keterangan": "POPO",
                                        "kode": "1.1.2.1",
                                        "id_program": 2,
                                        "id": 18,
                                        "id_parent": 7,
                                        "budget": 100,
                                        "uid": "0.635411904516733",
                                        "parent_uid": "0.3290943447074175",
                                        "children": [],
                                        "expanded": true,
                                        "level": 4
                                    }
                                ],
                                "uid": "0.3290943447074175",
                                "parent_uid": "0.1693920711782113",
                                "expanded": true,
                                "level": 3
                            }
                        ],
                        "uid": "0.1693920711782113",
                        "parent_uid": "0.07701742089873065",
                        "expanded": true,
                        "level": 2
                    }
                ],
                "uid": "0.07701742089873065",
                "expanded": true,
                "level": 1
            },
            {
                "keterangan": "TES",
                "kode": "3",
                "id_program": 2,
                "id": 9,
                "id_parent": null,
                "budget": 0,
                "children": [
                    {
                        "keterangan": "TES1",
                        "kode": "3.1",
                        "id_program": 2,
                        "id": 10,
                        "id_parent": 9,
                        "budget": 0,
                        "children": [
                            {
                                "keterangan": "TES",
                                "kode": "3.1.1",
                                "id_program": 2,
                                "id": 13,
                                "id_parent": 10,
                                "budget": 10000,
                                "uid": "0.39589786042506026",
                                "parent_uid": "0.7732418384868971",
                                "children": [],
                                "expanded": true,
                                "level": 3
                            }
                        ],
                        "uid": "0.7732418384868971",
                        "parent_uid": "0.06734582852727522",
                        "expanded": true,
                        "level": 2
                    }
                ],
                "uid": "0.06734582852727522",
                "expanded": true,
                "level": 1
            }
        ];

        function hitungSummary(node, selisih, tree) {
            if (node.id_parent !== null) {
                var item;
                for (item in tree) {
                    if (item.id === node.id_parent) {
                        item.budget += selisih;
                        hitungSummary(item, selisih, tree);
                    } else {
                        if (item.children.length > 0) {
                            var child;
                            for (child in item.children) {
                                hitungSummary(child, selisih, item.children);
                            }
                        }
                    }
                }
            }
        }

        function getTree(data, primaryIdName, parentIdName) {
            if (!data || data.length == 0 || !primaryIdName || !parentIdName)
                return [];

            var tree = [],
                    rootIds = [],
                    item = data[0],
                    primaryKey = item[primaryIdName],
                    treeObjs = {},
                    parentId,
                    parent,
                    len = data.length,
                    i = 0;

            while (i < len) {
                item = data[i++];
                primaryKey = item[primaryIdName];
                treeObjs[primaryKey] = item;
                parentId = item[parentIdName];

                if (parentId) {
                    parent = treeObjs[parentId];

                    if (parent.children) {
                        parent.children.push(item);
                    } else {
                        parent.children = [item];
                    }
                } else {
                    rootIds.push(primaryKey);
                }
            }

            for (var i = 0; i < rootIds.length; i++) {
                tree.push(treeObjs[rootIds[i]]);
            }
            ;

            return tree;
        }

        vm.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'ID',
        };
        vm.col_defs = [
            {
                field: 'keterangan',
                displayName: 'Keterangan',
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate: '<span class="pull-right"><bold>{{row.branch.budget|number}}</bold></span>'
            },
            {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a href="" ng-click="cellTemplateScope.ubah(row)" > <i class="glyphicon glyphicon-edit"></i> </a>  &nbsp; \n\
                                <a href="" ng-confirm-message="Anda yakin akan menghapus Proyek \'{{row.branch.kode}}\'?" ng-confirm="cellTemplateScope.hapus(row)" ng-show="row.branch.children.length===0"> <i class="glyphicon glyphicon-remove"></i> </a> &nbsp; \n\
                                <a href="" ng-click="cellTemplateScope.tambahSub(row)" > <i class="glyphicon glyphicon-plus"></i> </a>',
                cellTemplateScope: {
                    ubah: function (data) {         // this works too: $scope.someMethod;
                        console.log('ubah data', data);
                        vm.ubah(data.branch);
                    },
                    hapus: function (data) {         // this works too: $scope.someMethod;
                        console.log('hapus data', data);
                        vm.hapus(data.branch);
                    },
                    tambahSub: function (data) {         // this works too: $scope.someMethod;
                        console.log('tambahSub data', data);
                        vm.tambahSub(data.branch);
                    }
                }
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
                vm.tree_data = getTree(vm.dataFlat, 'id', 'id_parent');
                vm.totalBudget = 0;
                for (var i = 0; i < vm.tree_data.length; i++) {
                    vm.totalBudget += vm.tree_data[i].budget;
                }
                $timeout(function () {
                    $scope.my_tree.expand_all();
                }, 300);
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
            console.log('x', sub);
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

