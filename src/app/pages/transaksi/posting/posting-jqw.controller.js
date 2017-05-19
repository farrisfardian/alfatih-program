(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('PostingJqwController', PostingJqwController)

    /** @ngInject */
    function PostingJqwController($scope, $uibModal, $log, toastr, JurnalService, ParseLinks, AlertService, paginationConstants, pagingParams, DokumenSumberService, $state, $stateParams) {
        //// prepare the data

        $(document).ready(function () {
            var vm = this;
            $scope.dataJurnal = [];
            $scope.dataDetail = [];
            vm.jurnalGrid = {};
            vm.detailGrid = {};

            JurnalService.query({id: 'outstanding-all'},
                    function (data) {
                        initGrid(data);
                    }, function (error) {
                toastr.error('Gagal mencari data');
            }
            );
            function initGrid(data) {
                $scope.dataJurnal = data;
                $scope.jurnalGridSettings =
                        {
                            width: 850,
                            height: 250,
                            source: $scope.dataJurnal,
                            keyboardnavigation: true,
                            editable: true,
                            columns: [
                                {text: '', dataField: 'selected', columntype: 'checkbox', width: 50, editable: true},
                                {text: 'Voucher', dataField: 'noVoucher', width: 150, editable: false},
                                {text: 'Tanggal', dataField: 'tanggal', width: 150, editable: false},
                                {text: 'Keterangan', dataField: 'keterangan', width: 550, editable: false},
                            ],
                            rowselect: function (event) {
                                console.log('event.args.row', event.args.row);
                                $scope.dataDetail = event.args.row.listJurnalDetail;
                                console.log('$scope.dataDetail', $scope.dataDetail);
                                initDetail();
                            },
                            cellendedit: function (event) {
                                console.log('event', event);
                            }
                        };
                initDetail();

            }
            function initDetail() {
                $scope.dataFieldsDetail = [
                    {name: 'idAkun', map: 'akun>id'},
                    {name: 'kode', map: 'akun>kode'},
                    {name: 'keterangan', type: 'string'},
                    {name: 'debet', type: 'number'},
                    {name: 'kredit', type: 'number'},
                    {name: 'idAkad', map: 'akadSumberDana>id'},
                    {name: 'kodeAkad', map: 'akadSumberDana>kode'},
                    {name: 'idProgram', map: 'program>id', type: 'string'},
                    {name: 'kodeProgram', map: 'program>kode', type: 'string'},
                    {name: 'idProyek', map: 'proyek>id', type: 'string'},
                    {name: 'kodeProyek', map: 'proyek>kode', type: 'string'},
                    {name: 'namaAkun', map: 'akun>nama'},
                ];
                $scope.detailSource = {
                    localData: $scope.dataDetail,
                    dataType: "json",
                    dataFields: $scope.dataFieldsDetail
                };
                $scope.detailGridSettings =
                        {
                            width: 850,
                            height: 250,
                            source: $scope.detailSource,
                            keyboardnavigation: true,
                            columns: [
                                {text: 'Nomor Akun', datafield: 'kode', width: 200},
                                {text: 'Keterangan', datafield: 'keterangan', width: 400},
                                {text: 'Debet', datafield: 'debet', cellsAlign: 'right', align: 'right', cellsformat: 'n', width: 100},
                                {text: 'Kredit', datafield: 'kredit', cellsAlign: 'right', align: 'right', cellsformat: 'n', width: 100},
                                {text: 'Akad', datafield: 'kodeAkad', width: 200},
                                {text: 'ID Program', datafield: 'kodeProgram', width: 200},
                                {text: 'ID Proyek', datafield: 'kodeProyek', width: 200},
                                {text: 'Nama Akun', datafield: 'namaAkun', width: 300},
                            ]
                        };
            }
            function selectAll() {
                for (var i = 0; i < $scope.dataJurnal.length; i++) {
                    $scope.dataJurnal[i].selected = true;
                }
            }
            function deselectAll() {
                for (var i = 0; i < $scope.dataJurnal.length; i++) {
                    $scope.dataJurnal[i].selected = false;
                }
            }
            function toggle() {
                for (var i = 0; i < $scope.dataJurnal.length; i++) {
                    $scope.dataJurnal[i].selected = !$scope.dataJurnal[i].selected;
                }
            }
        });
    }

})();

