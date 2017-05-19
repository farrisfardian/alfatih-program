(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('BuktiKasControllerJqw', BuktiKasControllerJqw)

    /** @ngInject */
    function BuktiKasControllerJqw($scope, $uibModal, $log, toastr, BuktiKasService, MataUangService, EnumService,
            AkunService, JurnalService, $state, $stateParams) {
        var vm = this;
        vm.clear = clear;
        vm.tambahDetail = tambahDetail;
        vm.lookupAkun = lookupAkun;
        vm.lookupAkad = lookupAkad;
        vm.lookupAkunMaster = lookupAkunMaster;
        vm.isBalance = isBalance;
        vm.cariAkunByKode = cariAkunByKode;
        vm.cariAkunMasterByKode = cariAkunMasterByKode;
        vm.save = save;
        vm.hapusItem = hapusItem;
        vm.selectedRow = -1;
        var dataFields = [
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
        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        MataUangService.cariSemua({id: 'all'}, function (d) {
            vm.listMataUang = d;
        });
        AkunService.cariSemua({id: 'kas-bank'}, function (d) {
            vm.listKasBank = d;
        });
//        UnitService.cariSemua({id: 'all'}, function (d) {
//            console.log('vm.listUnit', d);
//            vm.listUnit = d;
//        });
//        EnumService.tipeBuktiKas().success(function (d) {
//            console.log('vm.listTipeBuktiKas', d);
//            vm.listTipeBuktiKas = d;
//        });

        function onSaveSuccess(result) {
            console.log('onSaveSuccess', result);
            toastr.success('Simpan BuktiKas sukses!');
            vm.isSaving = true;
            clear();
        }

        function onSaveError(data) {
            console.log('onSaveError data', data);
            toastr.error(data.headers('X-alfatihApp-error'));
            toastr.error('Simpan BuktiKas gagal!');
            vm.isSaving = false;
        }

        function save() {
            console.log('vm.data', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null && vm.data.id !== undefined) {
                JurnalService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                JurnalService.save(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function bindingGrid() {
            var source = {
                localData: vm.data.detail,
                dataType: "json",
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                    commit(true);
                },
                addrow: function (rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server is successful 
                    //and with parameter false if the synchronization failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful 
                    //and with parameter false if the synchronization failed.
                    commit(true);
                },
                dataFields: dataFields
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // update data source.
            $("#jqxgrid").jqxGrid({source: dataAdapter});
//                            $("#popupWindow").jqxWindow('hide');
        }

        function clear() {
            vm.data = {
                id: null,
                tanggal: new Date(),
                detail: [
                    {
                        akun: null,
                        keterangan: '',
                        debet: 0,
                        kredit: 0,
                        akadSumberDana: null,
                        program: null,
                        proyek: null
                    }
                ]
            };
            bindingGrid();
        }

        function initForm(id) {
            BuktiKasService.get({id: id},
                    function (data) {
                        vm.data = data;
                        toastr.success("Bukti Kas ditemukan");
                    },
                    function (data) {
                        toastr.error("Bukti Kas tidak ditemukan");
                    }
            );
        }
        function tambahDetail() {
            if (vm.data.listDetail == null) {
                vm.data.listDetail = [];
            }
//            vm.data.listDetail.push({
//                akun: null, jumlah: 0.0, rate: null, mataUang: null
//            });
            var commit = $("#jqxgrid").jqxGrid('addrow', null, {
                akun: null,
                debet: 0,
                kredit: 0,
            });

        }
        function lookupAkun(editor, editrow) {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkunJqw/lookupAkunJqw.html',
                controller: 'LookupAkunJqwController',
                controllerAs: 'ctrl',
                size: 'lg',
            });
            modalInstance.result.then(function (selectedItem) {
//                vm.akun.parent = selectedItem;
                console.log('selectedItem', selectedItem);
                console.log('editrow', editrow);
                AkunService.get({id: selectedItem},
                        function (d) {
                            console.log('editor', editor);
//                            vm.data.detail[editrow].akun = d;
                            var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);

//                            $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                            $('#jqxgrid').jqxGrid('updaterow', rowID, {
                                idAkun: d.id,
                                namaAkun: d.nama,
                                kode: d.kode,
                                keterangan: dataRecord.keterangan,
                                debet: dataRecord.debet,
                                kredit: dataRecord.kredit,
                                idAkad: dataRecord.idAkad,
                                kodeAkad: dataRecord.kodeAkad,
                                idProgram: dataRecord.idProgram,
                                kodeProgram: dataRecord.kodeProgram,
                                idProyek: dataRecord.idProyek,
                                kodeProyek: dataRecord.kodeProyek,
                            });
                            var inputField = editor.find('input');
                            inputField.jqxInput('val', d.kode);
//                            bindingGrid();
                        },
                        function (d) {

                        }
                );
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function lookupAkunMaster() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkun/lookup-akun.html',
                controller: 'LookupAkunController',
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
                vm.data.akun = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function lookupAkad(editor, editrow) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupAkad/lookupAkad.html',
                controller: 'LookupAkadController',
                controllerAs: 'ctrl',
                size: 'lg',
            });
            modalInstance.result.then(function (akad) {
//                vm.akun.parent = selectedItem;
//                console.log('selectedItem', selectedItem);
                if (editor != null && editrow >= 0) {
                    console.log('akad', akad);
                    console.log('editor', editor);
//                    vm.data.detail[editrow].akadSumberDana = akad;
                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
//                    $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowID, {
                        idAkun: dataRecord.idAkun,
                        namaAkun: dataRecord.namaAkun,
                        kode: dataRecord.kode,
                        keterangan: dataRecord.keterangan,
                        debet: dataRecord.debet,
                        kredit: dataRecord.kredit,
                        idAkad: akad.id,
                        kodeAkad: akad.kode,
                        idProgram: dataRecord.idProgram,
                        kodeProgram: dataRecord.kodeProgram,
                        idProyek: dataRecord.idProyek,
                        kodeProyek: dataRecord.kodeProyek,
                    });
                    var inputField = editor.find('input');
                    inputField.jqxInput('val', akad.kode);
//                    bindingGrid();
                } else {
                    vm.data.akadSumberDana = akad;
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function lookupProgram(editor, editrow) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupProgramProyek/lookupProgramProyek.html',
                controller: 'LookupProgramProyekController',
//                controllerAs: 'vm',
                size: 'lg',
            });
            modalInstance.result.then(function (d) {
                console.log('d', d);
//                vm.akun.parent = selectedItem;
//                console.log('selectedItem', selectedItem);
                if (editor != null && editrow >= 0) {
//                    console.log('result', d);
//                    console.log('editor', editor);
//                    vm.data.detail[editrow].program = d.program;
//                    vm.data.detail[editrow].proyek = d.proyek;
                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
//                    $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowID, {
                        idAkun: dataRecord.idAkun,
                        namaAkun: dataRecord.namaAkun,
                        kode: dataRecord.kode,
                        keterangan: dataRecord.keterangan,
                        debet: dataRecord.debet,
                        kredit: dataRecord.kredit,
                        idAkad: dataRecord.id,
                        kodeAkad: dataRecord.kode,
                        idProgram: d.program.id,
                        kodeProgram: d.program.kode,
                        idProyek: d.proyek == null ? null : d.proyek.id,
                        kodeProyek: d.proyek == null ? null : d.proyek.kode,
                    });

                    var inputField = editor.find('input');
                    inputField.jqxInput('val', d.program.kode);
//                    bindingGrid();
                } else {
                    console.log('bkm lookup result', d);
//                    vm.data.program = d;
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function isBalance() {
            var d = vm.data.multiCurrency === true ? vm.data.jumlah * vm.data.rate : vm.data.jumlah;
            var k = 0;
            if (vm.data.listDetail == null) {
                return false;
            } else {
                for (var i = 0; i < vm.data.listDetail.length; i++) {
                    k += vm.data.multiCurrency === true ? vm.data.listDetail[i].jumlah * vm.data.listDetail[i].rate : vm.data.listDetail[i].jumlah;
                }
            }
            if (d === k) {
                return true;
            } else {
                return false;
            }
        }

        function cariAkunByKode(kode, idx) {
            console.log('cariAkunByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                vm.data.listDetail[idx].akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function cariAkunMasterByKode(kode) {
            console.log('cariAkunMasterByKode executed, kode : ', kode);
            AkunService.cariSatu({id: "kode", cari: kode}, onSaveSuccess, onSaveError);
            function onSaveSuccess(data) {
                console.log('onSaveSuccess data', data);
                toastr.success('Akun ditemukan!');
                vm.data.akun = data;
            }

            function onSaveError(data) {
                console.log('onSaveError data', data);
                toastr.error(data.headers('X-alfatihApp-error'));
            }
        }

        function hapusItem() {
            var rowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
            console.log('rowindex', rowindex);
            $('#jqxgrid').jqxGrid('deleterow', rowindex);
        }

        console.log('data edit', $stateParams);
        if ($stateParams.id === null || $stateParams.id === undefined || $stateParams.id === 0 || $stateParams.id === '') {
            vm.clear();
        } else {
            initForm($stateParams.id);
        }
        var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'id'},
                        {name: 'kode'},
                        {name: 'nama'}
                    ],
                    url: 'api/akuntansi/akun/kas-bank',
                    async: false
                };
        var dataAdapter = new $.jqx.dataAdapter(source);
        console.log('dataAdapter', dataAdapter);

        // Create a jqxComboBox
        $scope.comboboxSettings = {selectedIndex: 0, source: dataAdapter, displayMember: "nama", valueMember: "id", width: "98%", height: 25};

        var source =
                {
                    localData: vm.data.detail,
                    dataType: "json",
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        // call commit with parameter true if the synchronization with the server is successful 
                        // and with parameter false if the synchronization failed.
                        commit(true);
                    },
                    dataFields: dataFields
                };

        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var getEditorDataAdapter = function (datafield) {
            var source =
                    {
                        localdata: vm.data.detail,
                        datatype: "json",
                        datafields: dataFields
                    };
            var dataAdapter = new $.jqx.dataAdapter(source, {uniqueDataFields: [datafield]});
            return dataAdapter;
        }
        var editrow = -1;

        $("#jqxgrid").jqxGrid(
                {
                    width: '100%',
                    height: 350,
                    pageable: false,
                    source: dataAdapter,
                    editable: true,
                    editmode: 'click',
                    columnsResize: true,
                    keyboardnavigation: false,
                    columns: [
                        {text: 'Nomor Akun', editable: true, columntype: 'template', dataField: 'kode', width: 100,
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                // construct the editor.
                                var inputElement = $("<div><input type='text'  /><button data-row='" + row + "' class='cariAkun'><img alt='search' width='16' height='16' src='../bower_components/jqwidgets/images/search_lg.png' /></button></div>").prependTo(editor);
                                inputElement.jqxInput({source: getEditorDataAdapter('kode'), displayMember: "kode", width: width, height: height});
                                $(".cariAkun").on('click', function (event) {
                                    editClick(event, row);
                                });

                                var editClick = function (event, row) {
                                    var target = $(event.target);
                                    lookupAkun(editor, editrow);
                                }
                            },
                            initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                                editrow = row;
                                // set the editor's current value. The callback is called each time the editor is displayed.
                                var inputField = editor.find('input');
//                                inputField.attr("disabled", "disabled"); 
                                if (pressedkey) {
                                    inputField.val(pressedkey);
                                    inputField.jqxInput('selectLast');
                                } else {
                                    inputField.val(cellvalue);
                                    inputField.jqxInput('selectAll');
                                }

                            },
                            geteditorvalue: function (row, cellvalue, editor) {
                                // return the editor's value.
                                return editor.find('input').val();
                            }
                        },
                        {text: 'Keterangan', editable: true, dataField: 'keterangan', width: 250, columntype: 'template',
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                // construct the editor.
                                var inputElement = $("<div><input type='text'  data-row='ket" + row + "'/></div>").prependTo(editor);
                                inputElement.jqxInput({source: getEditorDataAdapter('keterangan'), displayMember: "keterangan", width: width, height: height});
                                $(".ket"+row).on('blur', function (event) {
                                    editClick(event, row);
                                });

                                var editClick = function (event, row) {
                                    var target = $(event.target);
                                    vm.data.detail[editrow].keterangan = $(".ket"+row).val();
                                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
                                    $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                                    var inputField = editor.find('input');
                                    inputField.jqxInput('val', vm.data.detail[editrow].keterangan);
                                    bindingGrid();
                                }
                            },
                            initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                                editrow = row;
                                // set the editor's current value. The callback is called each time the editor is displayed.
                                var inputField = editor.find('input');
//                                inputField.attr("disabled", "disabled"); 
                                if (pressedkey) {
                                    inputField.val(pressedkey);
                                    inputField.jqxInput('selectLast');
                                } else {
                                    inputField.val(cellvalue);
                                    inputField.jqxInput('selectAll');
                                }

                            },
                            geteditorvalue: function (row, cellvalue, editor) {
                                // return the editor's value.
                                return editor.find('input').val();
                            }
                        },
                        {text: 'Debet', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'debet', width: 100, cellsAlign: 'right', align: 'right', cellsFormat: 'n'}, //c2
                        {text: 'Kredit', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'kredit', width: 100, cellsAlign: 'right', align: 'right', cellsFormat: 'n'},
                        {text: '<html>Sumber<br>Dana</html>', align: 'center', editable: true, dataField: 'kodeAkad', width: 80, columntype: 'template',
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                // construct the editor.
                                var inputElement = $("<div><input type='text'  /><button data-row='" + row + "' class='cariAkad'><img alt='search' width='16' height='16' src='../bower_components/jqwidgets/images/search_lg.png' /></button></div>").prependTo(editor);
                                inputElement.jqxInput({source: getEditorDataAdapter('kodeAkad'), displayMember: "kodeAkad", width: width, height: height});
                                $(".cariAkad").on('click', function (event) {
                                    editClick(event, row);
                                });

                                var editClick = function (event, row) {
                                    var target = $(event.target);
                                    lookupAkad(editor, editrow);
                                }
                            },
                            initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                                editrow = row;
                                // set the editor's current value. The callback is called each time the editor is displayed.
                                var inputField = editor.find('input');
//                                inputField.attr("disabled", "disabled"); 
                                if (pressedkey) {
                                    inputField.val(pressedkey);
                                    inputField.jqxInput('selectLast');
                                } else {
                                    inputField.val(cellvalue);
                                    inputField.jqxInput('selectAll');
                                }

                            },
                            geteditorvalue: function (row, cellvalue, editor) {
                                // return the editor's value.
                                return editor.find('input').val();
                            }
                        },
                        {text: 'Program', columngroup: 'proyekId', editable: true, dataField: 'kodeProgram', width: 80,
                            columntype: 'template',
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                // construct the editor.
                                var inputElement = $("<div><input type='text'  /><button data-row='" + row + "' class='cariProgram'><img alt='search' width='16' height='16' src='../bower_components/jqwidgets/images/search_lg.png' /></button></div>").prependTo(editor);
                                inputElement.jqxInput({source: getEditorDataAdapter('kodeProgram'), displayMember: "kodeProgram", width: width, height: height});
                                $(".cariProgram").on('click', function (event) {
                                    editClick(event, row);
                                });

                                var editClick = function (event, row) {
                                    var target = $(event.target);
                                    lookupProgram(editor, editrow);
                                }
                            },
                            initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                                editrow = row;
                                // set the editor's current value. The callback is called each time the editor is displayed.
                                var inputField = editor.find('input');
//                                inputField.attr("disabled", "disabled"); 
                                if (pressedkey) {
                                    inputField.val(pressedkey);
                                    inputField.jqxInput('selectLast');
                                } else {
                                    inputField.val(cellvalue);
                                    inputField.jqxInput('selectAll');
                                }

                            },
                            geteditorvalue: function (row, cellvalue, editor) {
                                // return the editor's value.
                                return editor.find('input').val();
                            }
                        },
                        {text: 'Proyek', columngroup: 'proyekId', editable: false, dataField: 'kodeProyek', width: 80},
                        {text: 'Nama Akun', editable: false, dataField: 'namaAkun', width: 300},
                    ],
                    columnGroups:
                            [
                                {text: 'Jumlah', align: 'center', name: 'jumlah'},
                                {text: 'ID', align: 'center', name: 'proyekId'}
                            ]
                });

        var editModes = ['Click', 'Double-Click', 'Selected Cell Click'];
        // change the Columns Editable state.
        $("#debet, #kredit, #keterangan").on('change', function (event) {
            var datafield = event.target.id;
            $("#jqxgrid").jqxGrid('setcolumnproperty', datafield, 'editable', event.args.checked);
        });
        $("#btnAddRow").on('click', function () {
//            vm.data.detail.push({
//                akun: null,
//                keterangan: '',
//                debet: 0,
//                kredit: 0,
//                akadSumberDana: null,
//                program: null,
//                proyek: null
//            });
//            bindingGrid();
            tambahDetail();
        });
        $("#btnDelRow").on('click', function () {
            hapusItem();
        });
        $("#btnSimpan").on('click', function () {
            console.log('row', $("#jqxgrid").jqxGrid('getrows'));
            var rows = $('#jqxgrid').jqxGrid('getrows');
            var result = "";

            var det = [];
            det.push({
                keterangan: vm.data.keterangan,
                debet: vm.data.debet,
                kredit: vm.data.kredit,
                rate: vm.data.rate,
                akun: vm.data.akunKasBank,
                proyek: null,
                program: null,
                akadSumberDana: vm.data.akadSumberDana,
                urut: 1
            });
            var tot = 0;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                console.log('row', row);
                det.push({
                    keterangan: row.keterangan,
                    debet: row.debet,
                    kredit: row.kredit,
                    rate: 1,
                    akun: {id: row.idAkun},
                    proyek: row.idProyek == null ? null : {id: row.idProyek},
                    program: row.idProgram == null ? null : {id: row.idProgram},
                    akadSumberDana: row.idAkad == null ? null : {id: row.idAkad},
                    urut: i + 2
                });
                tot += row.debet - row.kredit;
            }
            var url = $state.current.url;

            det[0].debet = tot<0? Math.abs(tot): tot;
            det[0].kredit = tot>0? tot: 0;
            vm.data = {
                noVoucher: vm.data.noVoucher,
                tanggal: vm.data.tanggal,
                keterangan: vm.data.keterangan,
                terimaDari: vm.data.terimaDari,
                multiCurrency: false,
                cabang: {id: 1},
                listJurnalDetail: det
            };
            
            
            if (url.indexOf('bkm') > -1) {
                console.log('masuk');
                vm.data.dokumen = {id: 'BKM'};
            }else{
                console.log('keluar');
                vm.data.dokumen = {id: 'BKK'};
            }
            console.log('simpan', vm.data);
            console.log('tot', tot);
            save();
            
        });
        $('#jqxgrid').on('cellvaluechanged', function (event) {
            if (event.args.datafield == 'debet' && event.args.newvalue > 0) {
                $("#jqxgrid").jqxGrid('setcellvalue', 0, 'kredit', 0);
            }
            if (event.args.datafield == 'kredit' && event.args.newvalue > 0) {
                $("#jqxgrid").jqxGrid('setcellvalue', 0, 'debet', 0);
            }
        });
        $("#jqxgrid").on('rowSelect', function (event) {
            console.log('rowSelect', event.args.row);
            var sdId = event.args.row.id;
            $("#btnDelRow").jqxButton({disabled: sdId != null});
        });

        $(document).ready(function () {
            var url = $state.current.url;            
            if (url.indexOf('bkm') > -1) {
                console.log('masuk');
                vm.status = 'BKM';
            }else{
                console.log('keluar');
                vm.status = 'BKK';
            }
            $('#txtAkad').jqxInput({disabled: true});
            $("#btnAddRow").jqxButton({width: 100, height: 25});
            $("#btnDelRow").jqxButton({width: 100, height: 25});
            $("#btnSimpan").jqxButton({width: 100, height: 25});
            $("#btnBatal").jqxButton({width: 100, height: 25});
//            $("#numericInput").jqxNumberInput({theme: "arctic", width: '100px', height: '25px',  spinButtons: true });
        });
    }

})();

