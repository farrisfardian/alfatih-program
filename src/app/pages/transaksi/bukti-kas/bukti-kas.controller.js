(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('BuktiKasController', BuktiKasController)

    /** @ngInject */
    function BuktiKasController($scope, $uibModal, $log, toastr, BuktiKasService, MataUangService, EnumService,
            AkunService, ParseLinks, AlertService, UnitService, $state, $stateParams) {
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

        var dataFields = [
            {name: 'idAkun', map: 'akun>id'},
            {name: 'kode', map: 'akun>kode'},
            {name: 'keterangan', type: 'string'},
            {name: 'debet', type: 'number'},
            {name: 'kredit', type: 'number'},
            {name: 'akadSumberDana', map: 'akadSumberDana>kode'},
            {name: 'program', type: 'string'},
            {name: 'proyek', type: 'string'},
            {name: 'namaAkun', map: 'akun>nama'},
        ];
        $scope.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        MataUangService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listMataUang', d);
            vm.listMataUang = d;
        });
        AkunService.cariSemua({id: 'kas-bank'}, function (d) {
            console.log('vm.listKasBank', d);
            vm.listKasBank = d;
        });
        UnitService.cariSemua({id: 'all'}, function (d) {
            console.log('vm.listUnit', d);
            vm.listUnit = d;
        });
        EnumService.tipeBuktiKas().success(function (d) {
            console.log('vm.listTipeBuktiKas', d);
            vm.listTipeBuktiKas = d;
        });

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
            console.log('vm.akun', vm.data);
            vm.isSaving = true;
            if (vm.data.id !== null && vm.data.id !== undefined) {
                BuktiKasService.update(vm.data, onSaveSuccess, onSaveError);
            } else {
                BuktiKasService.save(vm.data, onSaveSuccess, onSaveError);
            }
        }

        function bindingGrid() {
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
            vm.data.listDetail.push({
                akun: null, jumlah: 0.0, rate: null, mataUang: null
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
                            vm.data.detail[editrow].akun = d;
                            var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
                            $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                            var inputField = editor.find('input');
                            inputField.jqxInput('val', d.kode);
                            bindingGrid();
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
                if (editor!=null && editrow >= 0) {
                    console.log('akad', akad);
                    console.log('editor', editor);
                    vm.data.detail[editrow].akadSumberDana = akad;
                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                    var inputField = editor.find('input');
                    inputField.jqxInput('val', akad.kode);
                    bindingGrid();
                }else{
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
//                vm.akun.parent = selectedItem;
//                console.log('selectedItem', selectedItem);
                if (editor!=null && editrow >= 0) {
                    console.log('akad', d);
                    console.log('editor', editor);
                    vm.data.detail[editrow].program = d;
                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowID, vm.data.detail[editrow]);
                    var inputField = editor.find('input');
                    inputField.jqxInput('val', d.kode);
                    bindingGrid();
                }else{
                    vm.data.program = s;
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

        function hapusItem(idx) {
            $scope.vm.data.listDetail.splice(idx, 1);
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
                        console.log('updaterow', rowdata);
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
                        {text: 'Keterangan', editable: true, dataField: 'keterangan', width: 250},
                        {text: 'Debet', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'debet', width: 100, cellsAlign: 'right', align: 'right', cellsFormat: 'n'}, //c2
                        {text: 'Kredit', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'kredit', width: 100, cellsAlign: 'right', align: 'right', cellsFormat: 'n'},
                        {text: '<html>Sumber<br>Dana</html>', align: 'center', editable: true, dataField: 'akadSumberDana', width: 80, columntype: 'template',
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                // construct the editor.
                                var inputElement = $("<div><input type='text'  /><button data-row='" + row + "' class='cariAkad'><img alt='search' width='16' height='16' src='../bower_components/jqwidgets/images/search_lg.png' /></button></div>").prependTo(editor);
                                inputElement.jqxInput({source: getEditorDataAdapter('akadSumberDana'), displayMember: "akadSumberDana", width: width, height: height});
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
                        {text: 'Program', columngroup: 'proyekId', editable: true, dataField: 'program', width: 80},
                        {text: 'Proyek', columngroup: 'proyekId', editable: true, dataField: 'proyek', width: 80},
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
            vm.data.detail.push({
                akun: null,
                keterangan: '',
                debet: 0,
                kredit: 0,
                akadSumberDana: null,
                program: null,
                proyek: null
            });
            bindingGrid();
        });
        $("#btnLookupProgram").on('click', function () {
            lookupProgram(null, -1);
        });

        $(document).ready(function () {
            $('#txtAkad').jqxInput({disabled: true});
            $("#btnAddRow").jqxButton({width: 120, height: 25});
        });
    }

})();

