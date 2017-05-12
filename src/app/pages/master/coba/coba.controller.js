(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .controller('CobaController', CobaController)

    /** @ngInject */
    function CobaController($scope, $uibModal, $log) {
        //// prepare the data
        var source = {
            dataType: "json",
            dataFields: [
                {name: 'id', type: 'number'},
                {name: 'kode', type: 'string'},
                {name: 'nama', type: 'string'},
                {name: 'kel', map: 'kelompok>nama'},
                {name: 'children', type: 'array'},
                {name: 'expanded', type: 'bool'}
            ],
            hierarchy: {
                root: 'children'
            },
            id: 'id',
            url: 'api/akuntansi/akun/parent-children'
        };
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
            ],
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
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });
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
            }
        });
//        $('#treeGrid').on('rowSelect', function (event) {
//            var args = event.args;
//            var row = args.row;
//            alert("The row you selected is: " + row.kode + " " + row.LastName);
//        });
    }
})();

