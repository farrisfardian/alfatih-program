(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .controller('CobaController', CobaController)

    /** @ngInject */
    function CobaController(AkunService, $uibModal, $log) {
        var vm = this;
        vm.treeGridSettings = {
            width: 1000,
            source: new $.jqx.dataAdapter({
                dataType: "json",
                dataFields: [
                    {name: 'id'},
                    {name: 'kode'},
                    {name: 'nama'},
                    {name: 'kel', map: 'kelompok>nama'},
                    {name: 'children', type: 'array'},
                    {name: 'expanded', type: 'bool'}
                ],
                columnsresize: true,
                hierarchy: {
                    root: 'children'
                },
                id: 'id',
//                localData: vm.dataAkun
                url: 'api/akuntansi/akun/parent-children'
            }),
            sortable: true,
            rendered: function () {
                if ($(".editButtons").length > 0) {
                    $(".cancelButtons").jqxButton();
                    $(".editButtons").jqxButton();

                    var editClick = function (event) {
                        var target = $(event.target);
                        // get button's value.
                        var value = target.val();
                        // get clicked row.
                        var rowKey = event.target.getAttribute('data-row');
                        console.log('rowKey', rowKey);
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/pages/master/akun/akun-dialog.html',
                            controller: 'AkunDialogController',
                            controllerAs: 'vm',
                            size: 'md',
                            resolve: {
                                entity: ['AkunService', function (AkunService) {
                                        return AkunService.get({id: rowKey}).$promise;
                                    }],
                            }
                        });
                        modalInstance.result.then(function (selectedItem) {
//                            loadAll()
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });
//                        if (value == "Edit") {
//                            // begin edit.
//                            $("#treeGrid").jqxTreeGrid('beginRowEdit', rowKey);
//                            target.parent().find('.cancelButtons').show();
//                            target.val("Save");
//                        } else {
//                            // end edit and save changes.
//                            target.parent().find('.cancelButtons').hide();
//                            target.val("Edit");
//                            $("#treeGrid").jqxTreeGrid('endRowEdit', rowKey);
//                        }
                    }

                    $(".editButtons").on('click', function (event) {
                        editClick(event);
                    });

                    $(".cancelButtons").click(function (event) {
                        // end edit and cancel changes.
                        var rowKey = event.target.getAttribute('data-row');
                        $("#treeGrid").jqxTreeGrid('endRowEdit', rowKey, true);
                    });
                }
            },
            columns: [
                {text: 'Kode', dataField: 'kode', width: 120},
                {text: 'Nama', dataField: 'nama', width: 500},
                {text: 'Kelompok', dataField: 'kel', width: 200},
                {
                    text: 'Edit', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: null,
                    cellsRenderer: function (row, column, value) {
                        // render custom column.
                        return "<button data-row='" + row + "' class='editButtons'>Edit</button>\n\
                                <button style='display: none; margin-left: 5px;' data-row='" + row + "' class='cancelButtons'>Cancel</button>";
                    }
                }

            ]
        };
        $('#treeGrid').on('rowSelect', function(event) {
                var args = event.args;
                var row = args.row;
                console.log('rowSelect', args.row)
                alert("The row you selected is: " + row.kode + " " + row.nama);
//                $scope.selectedUnor={kode: row.kode, nama: row.nama};
            });
    }
})();

