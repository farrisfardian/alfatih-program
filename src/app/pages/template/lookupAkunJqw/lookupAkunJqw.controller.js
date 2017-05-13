(function () {
    'use strict';

    angular.module('Alfatih')
            .controller('LookupAkunJqwController', LookupAkunJqwController)

    /** @ngInject */
    function LookupAkunJqwController($uibModalInstance, toastr, AkunService) {
        var vm = this;

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
        $(document).ready(function () {
            // create Tree Grid
            $("#treeGrid").jqxTreeGrid({
                width: 850,
                source: dataAdapter,
                sortable: true,
                pageable: false,
                pagerMode: 'advanced',
                theme: 'energyblue',
                columns: [
                    {text: 'Kode', dataField: 'kode', width: 120},
                    {text: 'Nama', dataField: 'nama', width: 500},
                    {text: 'Kelompok', dataField: 'kel', width: 200},
                ]
            });
            $('#treeGrid').on('rowSelect', function (event) {
                var args = event.args;
                var row = args.row;
                console.log('row', row);
                if(row.children.length > 0){
                    toastr.error('Akun parent tidak bisa digunakan untuk transaksi!');
                }else{
                    $uibModalInstance.close(row.id);
                    
                }
            });
        });
    }
})();

