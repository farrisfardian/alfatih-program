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
        var daProgram = new $.jqx.dataAdapter(srcProgram);
        $(document).ready(function () {
            // create Tree Grid
            $("#programTreeGrid").jqxTreeGrid({
                width: 850,
                height: 300,
                source: daProgram,
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
                {name: 'id', type: 'number'},
                {name: 'kode', type: 'string'},
                {name: 'keterangan', type: 'string'},
                {name: 'budget', type: 'number'},
                {name: 'idProgram', map: 'program>id', type: 'number'},
                {name: 'kodeProgram', map: 'program>kode', type: 'string'},
                {name: 'namaProgram', map: 'program>nama', type: 'string'},
                {name: 'children', type: 'array'},
                {name: 'expanded', type: 'bool'}
            ];
            var srcProyek = {
                dataType: "json",
                dataFields: dfProyek,
                localdata: null,
                hierarchy: {
                    root: 'children'
                },
                id: 'id',
            };
            var daProyek = new $.jqx.dataAdapter(srcProyek);
            daProyek.dataBind();

            $("#programTreeGrid").on('rowSelect', function (event) {
//                if(event.args.row==undefined){
//                    return;
//                }
                var sdId = event.args.row.id;
                var dataSource = {
                    dataType: "json",
                    dataFields: dfProyek,
                    hierarchy: {
                        root: 'children'
                    },
                    id: 'id',
                    url: '/api/anggaran/proyek/filter-by-program/' + sdId,
                };
                var adapter = new $.jqx.dataAdapter(dataSource);
                // update data source.
                $("#proyekTreeGrid").jqxTreeGrid({source: adapter});
            });

            $("#proyekTreeGrid").jqxTreeGrid({
                source: daProyek,
                sortable: true,
                pageable: false,
                pagerMode: 'advanced',
                theme: 'energyblue',
                columns: [
                    {text: 'Kode', datafield: 'kode', width: 100},
                    {text: 'Detail Proyek', datafield: 'keterangan', width: 400},
                    {text: 'Budget', datafield: 'budget', cellsAlign: 'right', align: 'right', cellsformat: 'n', width: 100},
                ]
            });
            $('#proyekTreeGrid').on('rowDoubleClick', function (event) {
                var args = event.args;
                var row = args.row;
//                if (!$scope.showProyek) {
//                    row.id = null;
//                }
                var obj = {
                    program: {id: row.idProgram, kode: row.kodeProgram, nama: row.namaProgram},
                    proyek: $scope.showProyek? {id: row.id, kode: row.kode, keterangan: row.keterangan}: null
                }
                $uibModalInstance.close(obj);

            });
            $('#programTreeGrid').on('rowDoubleClick', function (event) {
                if($scope.showProyek){
                    return;
                }else{
                    var args = event.args;
                    var row = args.row;
                    console.log('row', row);
                    var obj = {
                        program: {id: row.id, kode: row.kode, nama: row.nama},
                        proyek: null
                    }
                    $uibModalInstance.close(obj);
                }
            });
//            $("#programTreeGrid").jqxTreeGrid('selectRow', 0);
        });
        
    }
})();

