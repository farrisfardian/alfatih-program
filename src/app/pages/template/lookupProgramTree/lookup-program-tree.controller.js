(function () {
    'use strict';
    angular.module('Alfatih')
            .controller('LookupProgramTreeController', LookupProgramTreeController);
    function LookupProgramTreeController($timeout, $stateParams, $TreeDnDConvert, $uibModalInstance, $scope, $uibModal, $log, toastr, ParseLinks, AlertService, paginationConstants, lookupPagingParams, $state, ProgramService) {

        var ctrl = this;
        ctrl.search = '';
        ctrl.loadAllFlat = loadAllFlat();
        ctrl.loadPage = loadPage;
        ctrl.predicate = lookupPagingParams.predicate;
        ctrl.reverse = lookupPagingParams.ascending;
        ctrl.transition = transition;
        ctrl.itemsPerPage = paginationConstants.itemsPerPage;
        ctrl.select = select;
        $scope.modalTitle = "Cari Program";
        ctrl.tree = {};
        ctrl.tree_data = {};
        ctrl.my_tree = ctrl.tree = {};
        ctrl._filter = {};
        ctrl.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            displayName: 'Kode'
//            titleClass: 'text-center',
//            cellClass: 'v-middle',
        };
        ctrl.col_defs = [
            {
                field: 'nama',
                displayName: 'Nama'
            },
            {
                field: 'mulai',
                displayName: 'Tgl Mulai',
                cellTemplate: '<span><bold>{{node.mulai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'selesai',
                displayName: 'Tgl Selesai',
                cellTemplate: '<span><bold>{{node.selesai|date:\'dd/MM/yyyy\'}}</bold></span>'
            },
            {
                field: 'aktif',
                displayName: 'Aktif',
                cellTemplate: '<center> <i class="ion-checkmark-round" ng-show="node.aktif"></i></center>'
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate: '<span><bold>{{node.budget|number}}</bold></span>'
            },
            {
                field: 'kode_tahun_ajaran',
                displayName: 'Tahun Ajaran'
            }, {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a ng-show="node.__children__.length===0" href="" ng-click="ctrl.select(node)"  > <i class="glyphicon glyphicon-edit"></i> Pilih</a>  '
            }
        ];
        loadAllFlat();

        function loadAllFlat() {
            ProgramService.cariSemua({id: 'list-flat'}, onSuccess, onError);
            function onSuccess(data) {
                ctrl.dataFlat = data;
                console.log('ctrl.dataFlat', ctrl.dataFlat);
                ctrl.tree_data = $TreeDnDConvert.line2tree(ctrl.dataFlat, 'id', 'id_parent');
            }
            function onError(error) {
                AlertService.error(error);
            }
        }

        function loadPage(page) {
            ctrl.page = page;
            ctrl.transition();
        }

        function transition() {
            lookupPagingParams.page = ctrl.page;
            lookupPagingParams.sort = ctrl.predicate + ',' + (ctrl.reverse ? 'asc' : 'desc');
            lookupPagingParams.search = ctrl.currentSearch;
            loadAll();
//            $state.transitionTo($state.$current, {
//                page: ctrl.page,
//                sort: ctrl.predicate + ',' + (ctrl.reverse ? 'asc' : 'desc'),
//                search: ctrl.currentSearch
//            });
        }
        console.log('ctrl.akun', ctrl.akun);
        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });
        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
        function select(x) {
            console.log('onSelect', x);
            ctrl.isSaving = false;
            ProgramService.get(
                    {id: x.id},
                    function (data) {
                        $uibModalInstance.close(data);
                    },
                    function (err) {
                        toastr.error('Program gagal dipilih!');
                    }
            );
        }
    }
})();

