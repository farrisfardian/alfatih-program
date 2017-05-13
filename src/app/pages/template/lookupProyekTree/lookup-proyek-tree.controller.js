(function () {
    'use strict';

    angular.module('Alfatih')
            .controller('LookupProyekTreeController', LookupProyekTreeController)

    /** @ngInject */
    function LookupProyekTreeController($scope, $uibModal, $log, $timeout, $TreeDnDConvert, $state, $uibModalInstance, toastr, ProyekService, ParseLinks, AlertService, program, ProgramService) {
        var ctrl = this;
        ctrl.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        ctrl.data = {
            durasiAwal: new Date(),
            durasiAkhir: new Date(),
        };
        ctrl.data.program = program;
        ctrl.programExists = program === undefined || program.id === null ? false : true;
        ctrl.lookupProgram = lookupProgram;
        ctrl.selectProgram = selectProgram;
        ctrl.selectProyek = select;
        ctrl.tree = {};
        ctrl.hitungSummary = hitungSummary;
        ctrl.tree_data = {};
        $scope.my_tree = ctrl.tree = {};
        ctrl._filter = {};
        ctrl.listProyek = [];
        ctrl.totalBudget = 0;

        $scope.modalTitle = "Cari Proyek";
        ctrl.tree_program = {};
        ctrl.tree_data_program = {};
        ctrl.my_tree_program = ctrl.tree_program = {};
        ctrl._filter_program = {};
        ctrl.expanding_property_program = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            displayName: 'Kode'
//            titleClass: 'text-center',
//            cellClass: 'v-middle',
        };
        ctrl.col_defs_program = [
            {
                field: 'nama',
                displayName: 'Nama'
            },
            {
                field: 'mulai',
                displayName: 'Tgl Mulai',
                cellTemplate: '<span><bold>{{node.mulai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'selesai',
                displayName: 'Tgl Selesai',
                cellTemplate: '<span><bold>{{node.selesai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'aktif',
                displayName: 'Aktif',
                cellTemplate: '<center> <i class="ion-checkmark-round" ng-show="node.aktif"></i></center>'
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate: '<span><bold>{{node.budget|number}}</bold></span>'
            },
            {
                field: 'kode_tahun_ajaran',
                displayName: 'Tahun Ajaran'
            }, {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a ng-show="node.__children__.length===0" href="" ng-click="ctrl.selectProgram(node)"  > <i class="glyphicon glyphicon-edit"></i> Pilih</a>  '
            }
        ];
        loadAllFlatProgram();

        function loadAllFlatProgram() {
            ProgramService.cariSemua({id: 'list-flat'}, onSuccess, onError);
            function onSuccess(data) {
                ctrl.dataFlatProgram = data;
                console.log('ctrl.dataFlatProgram', ctrl.dataFlatProgram);
                ctrl.tree_data_program = $TreeDnDConvert.line2tree(ctrl.dataFlatProgram, 'id', 'id_parent');
                console.log('ctrl.tree_data_program', ctrl.tree_data_program);
            }
            function onError(error) {
                AlertService.error(error);
            }
        }

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

        ctrl.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'ID',
        };
        ctrl.col_defs = [
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
                cellTemplate: '<a href="" ng-click="cellTemplateScope.select(row)" ng-show="row.branch.children.length===0"> <i class="glyphicon glyphicon-edit"></i> Pilih</a>',
                cellTemplateScope: {
                    select: function (data) {         // this works too: $scope.someMethod;
                        console.log('select data', data);
                        ctrl.selectProyek(data.branch);
                    }
                }
            }
        ];

        function resetAllFlat() {
            ctrl.tree_data = {};
            ctrl.my_tree = ctrl.tree = {};
        }
        function loadAllFlat() {
            ProyekService.query({id: 'list-flat-by-program', cari: ctrl.data.program.id}, onSuccess, onError);
            function onSuccess(data) {
                ctrl.tree_data = {};
                ctrl.my_tree = ctrl.tree = {};
                ctrl.dataFlat = (data === null || data.length === 0) ? [] : data;
                console.log('ctrl.dataFlat', ctrl.dataFlat);
                ctrl.tree_data = getTree(ctrl.dataFlat, 'id', 'id_parent');
                ctrl.totalBudget = 0;
                for (var i = 0; i < ctrl.tree_data.length; i++) {
                    ctrl.totalBudget += ctrl.tree_data[i].budget;
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
                ctrl.data.program = selectedItem;
                console.log('ctrl.data.program', ctrl.data.program);
                loadAllFlat();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        function selectProgram(x) {
            ctrl.data.program = x;
            console.log('ctrl.data.program', ctrl.data.program);
            loadAllFlat();
        }
        function select(x) {
            console.log('onSelect', x);
            ctrl.isSaving = false;
            ProyekService.get(
                    {id: x.id},
                    function (data) {
                        $uibModalInstance.close(data);
                    },
                    function (err) {
                        toastr.error('Proyek gagal dipilih!');
                    }
            );
        }
//        $timeout(function () {
//            console.log('ctrl.data.program', ctrl.data.program);
//            if (ctrl.data.program !== undefined && ctrl.data.program.id !== null) {
//                loadAllFlat();
//            }
//        }, 300);

    }

})();

