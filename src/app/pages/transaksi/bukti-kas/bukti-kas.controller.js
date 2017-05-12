(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .controller('BuktiKasController', BuktiKasController)

    /** @ngInject */
    function BuktiKasController($scope, $uibModal, $log, toastr, BuktiKasService, MataUangService, EnumService, AkunService, ParseLinks, AlertService, paginationConstants, pagingParams, UnitService, $state, $stateParams) {
        var vm = this;
        vm.search = '';
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.tambahDetail = tambahDetail;
        vm.lookupAkun = lookupAkun;
        vm.lookupAkunMaster = lookupAkunMaster;
        vm.isBalance = isBalance;
        vm.cariAkunByKode = cariAkunByKode;
        vm.cariAkunMasterByKode = cariAkunMasterByKode;
        vm.save = save;
        vm.hapusItem = hapusItem;

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

        function loadAll() {
            BuktiKasService.query({
                id: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : 'filter',
                cari: (vm.search === null || vm.search === undefined || vm.search === '') ? '' : vm.search,
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.data = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

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

        function clear() {
            vm.data = {
                id: null,
                tanggal: new Date()
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
        function lookupAkun(index) {
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
                vm.data.listDetail[index].akun = selectedItem;
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

        // prepare the data
        var data = [
            {
                kode: '001',
                keterangan: 'keterangan',
                debet: 1000000,
                kredit: 0,
                sumberDana: '',
                program: '',
                proyek: '',
                namaAkun: 'Pendapatan Penerimaan',
            },
            {
                kode: '002',
                keterangan: 'keterangan',
                debet: 1000000,
                kredit: 0,
                sumberDana: '',
                program: '',
                proyek: '',
                namaAkun: 'Pendapatan Penerimaan',
            }
        ];


        var source =
                {
                    localData: data,
                    dataType: "json",
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        // call commit with parameter true if the synchronization with the server is successful 
                        // and with parameter false if the synchronization failed.
                        commit(true);
                    },
                    dataFields:
                            [
                                {name: 'kode', type: 'string'},
                                {name: 'keterangan', type: 'string'},
                                {name: 'debet', type: 'number'},
                                {name: 'kredit', type: 'number'},
                                {name: 'sumberDana', type: 'string'},
                                {name: 'program', type: 'string'},
                                {name: 'proyek', type: 'string'},
                                {name: 'namaAkun', type: 'string'},
                            ]
                };

        var dataAdapter = new $.jqx.dataAdapter(source);
        var getEditorDataAdapter = function (datafield) {
            var source =
                    {
                        localdata: data,
                        datatype: "json",
                        datafields:
                                [
                                    {name: 'kode', type: 'string'},
                                    {name: 'keterangan', type: 'string'},
                                    {name: 'debet', type: 'number'},
                                    {name: 'kredit', type: 'number'},
                                    {name: 'sumberDana', type: 'string'},
                                    {name: 'program', type: 'string'},
                                    {name: 'proyek', type: 'string'},
                                    {name: 'namaAkun', type: 'string'},
                                ]
                    };
            var dataAdapter = new $.jqx.dataAdapter(source, {uniqueDataFields: [datafield]});
            return dataAdapter;
        }

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
                                    console.log('row', row);
                                    editClick(event);
                                });

                                var editClick = function (event) {
                                    var target = $(event.target);
                                    console.log('target', target);
                                    // get button's value.
                                    var value = target.val();
                                    // get clicked row.
                                    var rowKey = event.target.getAttribute('data-row');
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
                            },
                            initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
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
                        {text: 'Debet', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'debet', width: 120, cellsAlign: 'right', align: 'right', cellsFormat: 'n'}, //c2
                        {text: 'Kredit', columntype: 'textbox', columngroup: 'jumlah', editable: true, dataField: 'kredit', width: 120, cellsAlign: 'right', align: 'right', cellsFormat: 'n'},
                        {text: '<html>Sumber<br>Dana</html>', align: 'center', editable: true, dataField: 'sumberDana', width: 90},
                        {text: 'Program', columngroup: 'proyekId', editable: true, dataField: 'program', width: 90},
                        {text: 'Proyek', columngroup: 'proyekId', editable: true, dataField: 'proyek', width: 90},
                        {text: 'Nama Akun', editable: false, dataField: 'namaAkun', width: 250},
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
    }

})();

