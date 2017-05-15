(function () {
    'use strict';

    angular.module('Alfatih')
            .controller('LookupAkadController', LookupAkadController)

    /** @ngInject */
    function LookupAkadController($uibModalInstance, toastr, $timeout) {
//            SumberDanaService.cariSemua({id: 'all'}, function (d) {
//                console.log('vm.listSumberDana', d);
//                vm.listSumberDana = d;
//            });

        $(document).ready(function () {
            // prepare the data
            var source = {
                dataType: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'nama'},
                    {name: 'alamat'},
                    {name: 'telepon'},
                    {name: 'email'},
                ],
                id: 'id',
                url: 'api/akuntansi/sumberdana/all'
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#sumberDanaGrid").jqxGrid({
                width: 850,
                height: 200,
                source: dataAdapter,
                keyboardnavigation: false,
                columns: [
                    {text: 'Nama', datafield: 'nama', width: 250},
                    {text: 'Alamat', datafield: 'alamat', width: 150},
                    {text: 'Telepon', datafield: 'telepon', width: 100},
                    {text: 'Email', datafield: 'email', width: 180},
//                            {text: 'ID', datafield: 'id', width: 80},
                ]
            });

//             Akad Grid
//             prepare the data
            var dataFields = [
                {name: 'id'},
                {name: 'kode', type: 'string'},
                {name: 'tanggal', type: 'date'},
                {name: 'jumlah', type: 'number'},
                {name: 'sumberdana', map: 'sumberDana>nama'},
                {name: 'program', map: 'program>nama'},
                {name: 'Keterangan', type: 'string'}
            ];
            var source = {
                datafields: dataFields,
                localdata: []
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            $("#sumberDanaGrid").on('rowselect', function (event) {
                console.log('event.args', event.args);
//                if(event.args.row==undefined){
//                    return;
//                }
                var sdId = event.args.row.id;
                var dataSource = {
                    dataType: "json",
                    datafields: dataFields,
                    url: '/api/akuntansi/akad-sumberdana/filter-by-sumberdana/' + sdId,
                };
                var adapter = new $.jqx.dataAdapter(dataSource);

                // update data source.
                $("#akadGrid").jqxGrid({source: adapter});
            });

            $("#akadGrid").jqxGrid({
                width: 850,
                height: 250,
                keyboardnavigation: false,
                columns: [
//                            {
//                                text: 'Pilih', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, datafield: 'id',
//                                cellsRenderer: function (row, datafield, value, defaultcellsrenderer, columnProperties, rowData) {
//                                    // render custom column.
//                                    return "<button data-row='" + datafield + "' class='btnPilih'> Pilih </button>";
//                                }
//                            },
                    {text: 'Kode', datafield: 'kode', width: 100},
                    {text: 'Tanggal', datafield: 'tanggal', cellsformat: 'dd/MM/yyyy', width: 100},
                    {text: 'Jumlah', datafield: 'jumlah', cellsAlign: 'right', align: 'right', cellsformat: 'n'},
                    {text: 'Sumber Dana', datafield: 'sumberdana', width: 200},
                    {text: 'Program', datafield: 'program', width: 200},
                    {text: 'Keterangan', datafield: 'keterangan', width: 200}

                ]
            });
            $('#akadGrid').on('rowdoubleclick', function (event) {
                var args = event.args;
                var row = args.row;
                console.log('row.bounddata', row.bounddata);
                $uibModalInstance.close(row.bounddata);

            });
            $timeout(function () {
                $("#sumberDanaGrid").jqxGrid('selectrow', 0);
            }, 100);
//            
        });
    }
})();

