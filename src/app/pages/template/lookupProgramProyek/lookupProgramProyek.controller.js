(function () {
    'use strict';

    angular.module('Alfatih')
            .controller('LookupProgramProyekController', LookupProgramProyekController)

    /** @ngInject */
    function LookupProgramProyekController($uibModalInstance, toastr, $scope) {
        $scope.showProyek = true;

        //// prepare the data
        var srcProgram = {
            dataType: "json",
            dataFields: [
                {name: 'id', type: 'number'},
                {name: 'kode', type: 'string'},
                {name: 'nama', type: 'string'},
                {name: 'children', type: 'array'},
                {name: 'expanded', type: 'bool'}
            ],
            hierarchy: {
                root: 'children'
            },
            id: 'id',
            url: 'api/anggaran/program/parent-children'
        };
        var dataAdapter = new $.jqx.dataAdapter(srcProgram);
        $(document).ready(function () {
            // create Tree Grid
            $("#programTreeGrid").jqxTreeGrid({
                width: 850,
                height: 300,
                source: dataAdapter,
                sortable: true,
                pageable: false,
                pagerMode: 'advanced',
                theme: 'energyblue',
                columns: [
                    {text: 'Kode', dataField: 'kode', width: 150},
                    {text: 'Program', dataField: 'nama', width: 600},
                ]
            });
            var dfProyek = [
                {name: 'id'},
                {name: 'kode', type: 'string'},
                {name: 'nama', type: 'string'},
                {name: 'budget', type: 'number'}
            ];
            var srcProyek = {
                datafields: dfProyek,
                localdata: []
            };
            var daProyek = new $.jqx.dataAdapter(srcProyek);
            daProyek.dataBind();
            $("#programTreeGrid").on('rowSelect', function (event) {
                console.log('event.args', event.args);
//                if(event.args.row==undefined){
//                    return;
//                }
                var sdId = event.args.row.id;
                var dataSource = {
                    dataType: "json",
                    datafields: dfProyek,
                    url: '/api/anggaran/proyek/filter-by-program/' + sdId,
                };
                var adapter = new $.jqx.dataAdapter(dataSource);

                // update data source.
                $("#proyekTreeGrid").jqxTreeGrid({source: adapter});
            });

            $("#proyekTreeGrid").jqxTreeGrid(
                    {
                        width: 850,
                        height: 250,
                        theme: 'energyblue',
                        columns: [
                            {text: 'Kode', datafield: 'kode', width: 100},
                            {text: 'Detail Proyek', datafield: 'nama', width: 400},
                            {text: 'Budget', datafield: 'budget', cellsAlign: 'right', align: 'right', cellsformat: 'n', width: 100},
                        ]
                    });
            $('#proyekTreeGrid').on('rowDoubleClick', function (event) {
                var args = event.args;
                var row = args.row;
                console.log('row.bounddata', row.bounddata);
                $uibModalInstance.close(row.bounddata);

            });
//            $("#programTreeGrid").jqxTreeGrid('selectRow', 0);
            $("#jqxcheckbox").jqxCheckBox({width: 400, height: 25});
            $("#jqxcheckbox").on('change', function (event) {
                var checked = event.args.checked;
                $scope.showProyek = checked;
                console.log('checkbox', $scope.showProyek);
//                if (checked) {
//                    $("#proyekTreeGrid").show();
//                } else {
//                    $("#proyekTreeGrid").hide();
//                }
            });
        });
    }
})();

