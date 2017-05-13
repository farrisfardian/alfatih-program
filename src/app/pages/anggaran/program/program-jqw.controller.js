(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProgramJqwController', ProgramJqwController)

    /** @ngInject */
    function ProgramJqwController($scope, $uibModal, $log, $timeout, ProgramService, $ngBootbox, toastr) {
        //// prepare the data
        var source = {};
        function init() {
            ProgramService.cariSemua({id: 'parent-children'},
                    function (data) {
                        source = {
                            dataType: "json",
                            dataFields: [
                                {name: 'id', type: 'number'},
                                {name: 'kode', type: 'string'},
                                {name: 'nama', type: 'string'},
                                {name: 'budget', type: 'number'},
                                {name: 'tahunAjaran', map: 'tahunAjaran>kode'},
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
                    {text: 'Nama', dataField: 'nama', width: 400},
                    {text: 'Budget', dataField: 'budget', width: 150,
                        cellsRenderer: function (row, column, value) {
                            return '<span class="pull-right">' + value + '</span>';
                        }
                    },
                    {text: 'Tahun Ajaran', dataField: 'tahunAjaran', width: 100},
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
                            templateUrl: 'app/pages/anggaran/program/program-dialog.html',
                            controller: 'ProgramDialogController',
                            controllerAs: 'vm',
                            size: 'lg',
                            resolve: {
                                entity: {id: null},
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
                                templateUrl: 'app/pages/anggaran/program/program-dialog.html',
                                controller: 'ProgramDialogController',
                                controllerAs: 'vm',
                                size: 'lg',
                                resolve: {
                                    entity: ['ProgramService', function (ProgramService) {
                                            return ProgramService.get({id: rowKey}).$promise;
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

                            var sub = {id: null, parent: null};
                            ProgramService.get({id: rowKey}, function (data) {
                                sub.parent = data;
                                console.log('sub', sub);
                            }, function (data) {
                                sub.parent = data;
                                console.log('sub', sub);
                            });
                            $timeout(function () {
                                var modalInstance = $uibModal.open({
                                    animation: true,
                                    templateUrl: 'app/pages/anggaran/program/program-dialog.html',
                                    controller: 'ProgramDialogController',
                                    controllerAs: 'vm',
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
                            }, 300);
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
                            ProgramService.get({id: rowKey}, function (data) {
                                selected = data;
                                console.log('success', data);
                            }, function (data) {
                                console.log('error', data);
                            });
                            $timeout(function () {
                                if (selected.children === null || selected.children === undefined || selected.children.length === 0) {
                                    $ngBootbox.confirm({message: "<b>Anda yakin akan menghapus Program '" + selected.nama + "' ??</b>", title: 'Perhatian!!!'})
                                            .then(function () {
                                                ProgramService.delete({id: rowKey},
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
                            }, 300);
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
        init();

//        $('#treeGrid').on('rowSelect', function (event) {
//            var args = event.args;
//            var row = args.row;
//            alert("The row you selected is: " + row.kode + " " + row.LastName);
//        });
    }
})();

