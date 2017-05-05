(function () {
    'use strict';
    angular.module('Alfatih')
            .controller('LookupAkunTreeController', LookupAkunTreeController);
    function LookupAkunTreeController($timeout, $stateParams, $TreeDnDConvert, $uibModalInstance, $scope, $uibModal, $log, toastr, ParseLinks, AlertService, paginationConstants, lookupPagingParams, $state, AkunService) {

        var ctrl = this;
        ctrl.search = '';
        ctrl.loadAllFlat = loadAllFlat();
        ctrl.loadPage = loadPage;
        ctrl.predicate = lookupPagingParams.predicate;
        ctrl.reverse = lookupPagingParams.ascending;
        ctrl.transition = transition;
        ctrl.itemsPerPage = paginationConstants.itemsPerPage;
        ctrl.select = select;
        $scope.modalTitle = "Cari Akun";
        ctrl.tree = {};
        ctrl.tree_data = {};
        ctrl.my_tree = ctrl.tree = {};
        ctrl._filter = {};
        ctrl.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'kode',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'Kode'
        };
        ctrl.col_defs = [
            {
                field: 'nama',
                displayName: 'Nama'
            },
            {
                field: 'kelompok',
                displayName: 'Kelompok'
            },{
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a href="" ng-click="ctrl.select(node)"  > <i class="glyphicon glyphicon-edit"></i> Pilih</a>  '
            }
        ];
        loadAllFlat();

        function loadAllFlat() {
            AkunService.cariSemua({id: 'list-flat'}, onSuccess, onError);
            function onSuccess(data) {
                ctrl.dataFlat = data;
                console.log('ctrl.dataFlat', ctrl.dataFlat);
                ctrl.tree_data = $TreeDnDConvert.line2tree(ctrl.dataFlat, 'id', 'id_parent');
            }
            function onError(error) {
                AlertService.error(error.data.message);
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
            AkunService.get(
                    {id: x.id},
                    function (data) {
                        $uibModalInstance.close(data);
                    },
                    function (err) {
                        toastr.error('Akun gagal dipilih!');
                    }
            );
        }
    }
})();

