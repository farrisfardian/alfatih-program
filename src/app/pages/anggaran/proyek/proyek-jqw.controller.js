(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekJqwController', ProyekJqwController)

    /** @ngInject */
    function ProyekJqwController($scope, $uibModal, $log, $timeout, $TreeDnDConvert, toastr, ProyekService, ParseLinks, AlertService, paginationConstants, pagingParams, $state, $ngBootbox) {
        var vm = this;
        vm.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        vm.data = {
            durasiAwal: new Date(),
            durasiAkhir: new Date(),
        };
        vm.lookupProgram = lookupProgram;
        vm.tree = {};
        vm.hitungSummary = hitungSummary;
        vm.tree_data = {};
        $scope.my_tree = vm.tree = {};
        vm._filter = {};
        vm.listProyek = [];
        vm.totalBudget = 0;
        var source = {};
        function init() {
            ProyekService.cariSemua({id: 'parent-children', cari: vm.data.program.id},
                    function (data) {
                        source = {
                            dataType: "json",
                            dataFields: [
                                {name: 'id', type: 'number'},
                                {name: 'kode', type: 'string'},
                                {name: 'budget', type: 'number'},
                                {name: 'keterangan', type: 'string'},
                                {name: 'children', type: 'array'},
                                {name: 'expanded', type: 'bool'}
                            ],
                            hierarchy: {
                                root: 'children'
                            },
                            id: 'id',
                            localData: data
//                            url: 'api/anggaran/program/parent-children'
                        };
                        vm.totalBudget = 0;
                        for (var i = 0; i < data.length; i++) {
                            vm.totalBudget += data[i].budget;
                        }
                        initTreeGrid();
                    },
                    function () {
                        toastr.error('Ambil data gagal!.');
                    }
            );
        }
        function initTreeGrid() {
            var dataAdapter = new $.jqx.dataAdapter(source);

            // create Tree Grid
            $("#treeGrid").jqxTreeGrid({
                width: 1000,
                source: dataAdapter,
                sortable: true,
                pageable: false,
                pagerMode: 'advanced',
                theme: 'energyblue',
                columns: [
                    {text: 'Kode', dataField: 'kode', width: 200},
                    {text: 'Keterangan', dataField: 'keterangan', width: 400},
                    {text: 'Budget', dataField: 'budget', width: 150,
                        cellsRenderer: function (row, column, value) {
                            return '<span class="pull-right">' + value + '</span>';
                        }
                    },
                    {
                        text: '<button style="margin-left: 5px;" class="btn btn-xs btn-info" id="addButton">Tambah</button>', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: 'id',
                        cellsRenderer: function (row, column, value) {
                            // render custom column.
                            return "<button data-row='" + row + "' class='editButtons'>Edit</button>\n\
                                <button data-row='" + row + "' class='addSubButtons'>Sub</button>\n\
<button data-row='" + row + "' data-nama='' class='delButtons' style='background-color:red'>Del</button>";
                        }
                    }
                ],
                rendered: function () {
                    $("#addButton").jqxButton();
                    var addClick = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                            controller: 'ProyekDialogController',
                            controllerAs: 'ctrl',
                            size: 'lg',
                            resolve: {
                                entity: {id: null, program: vm.data.program},
                            }
                        });
                        modalInstance.result.then(function (selectedItem) {
                            init();
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });
                    };
                    $("#addButton").on('click', function () {
                        addClick();
                    });
                    if ($(".editButtons").length > 0) {
                        $(".editButtons").jqxButton();
                        $(".addSubButtons").jqxButton();
                        $(".delButtons").jqxButton();

                        var editClick = function (event) {
                            var target = $(event.target);
                            // get button's value.
                            var value = target.val();
                            // get clicked row.
                            var rowKey = event.target.getAttribute('data-row');
                            console.log('rowKey', rowKey);
                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                                controller: 'ProyekDialogController',
                                controllerAs: 'ctrl',
                                size: 'lg',
                                resolve: {
                                    entity: ['ProyekService', function (ProyekService) {
                                            return ProyekService.get({id: rowKey}).$promise;
                                        }],
                                }
                            });
                            modalInstance.result.then(function (selectedItem) {
                                init()
                            }, function () {
                                $log.info('Modal dismissed at: ' + new Date());
                            });
                        };
                        var addSubClick = function (event) {
                            console.log('event', event);
                            var target = $(event.target);
                            // get button's value.
                            var value = target.val();
                            // get clicked row.
                            var rowKey = event.target.getAttribute('data-row');
                            console.log('rowKey', rowKey);

                            var sub = {id: null, parent: null, program: vm.data.program};
                            ProyekService.get({id: rowKey}, function (data) {
                                sub.parent = data;
                                console.log('sub', sub);
                                var modalInstance = $uibModal.open({
                                    animation: true,
                                    templateUrl: 'app/pages/anggaran/proyek/proyek-dialog.html',
                                    controller: 'ProyekDialogController',
                                    controllerAs: 'ctrl',
                                    size: 'lg',
                                    resolve: {
                                        entity: sub,
                                    }
                                });
                                modalInstance.result.then(function (selectedItem) {
                                    init()
                                }, function () {
                                    $log.info('Modal dismissed at: ' + new Date());
                                });
                            }, function (data) {
                                sub.parent = data;
                                console.log('sub', sub);
                            });
                        };
                        var delClick = function (event) {
                            console.log('event', event);
                            var target = $(event.target);
                            // get button's value.
                            var value = target.val();
                            // get clicked row.
                            var rowKey = event.target.getAttribute('data-row');
                            console.log('rowKey', rowKey);

                            var selected = null;
                            ProyekService.get({id: rowKey}, function (data) {
                                selected = data;
                                if (selected.children === null || selected.children === undefined || selected.children.length === 0) {
                                    $ngBootbox.confirm({message: "<b>Anda yakin akan menghapus Proyek '" + selected.kode + "' ??</b>", title: 'Perhatian!!!'})
                                            .then(function () {
                                                ProyekService.delete({id: rowKey},
                                                        function () {
                                                            toastr.success('Hapus data sukses!');
                                                            init()
                                                        },
                                                        function () {
                                                            toastr.error('Hapus data gagal! Mungkin data masih dibutuhkan program lain.');
                                                        }
                                                );
                                            }, function () {
                                                console.log('Confirm dismissed!');
                                            });
                                } else {
                                    toastr.error('Parent tidak boleh dihapus');
                                }
                                console.log('success', data);
                            }, function (data) {
                                console.log('error', data);
                            });
                        };

                        $(".editButtons").on('click', function (event) {
                            editClick(event);
                        });
                        $(".addSubButtons").on('click', function (event) {
                            addSubClick(event);
                        });
                        $(".delButtons").on('click', function (event) {
                            delClick(event);
                        });

                        $(".cancelButtons").click(function (event) {
                            // end edit and cancel changes.
                            var rowKey = event.target.getAttribute('data-row');
                            $("#treeGrid").jqxTreeGrid('endRowEdit', rowKey, true);
                        });
                    }
                }
            });
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
//                loadAllFlat();
                init();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

})();

