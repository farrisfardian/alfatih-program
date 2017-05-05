(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .controller('ProyekController', ProyekController)

    /** @ngInject */
    function ProyekController($scope, $uibModal, $log, $TreeDnDConvert, toastr, ProyekService,
            ParseLinks, AlertService, paginationConstants, pagingParams, $state, SkemaBudgetService) {
        var vm = this;
        vm.dateOptions = {format: 'DD/MM/YYYY', showClear: false};
        vm.data = {
            durasiAwal: new Date(),
            durasiAkhir: new Date(),
        };
        vm.lookupProgram = lookupProgram;
        vm.tree = {};
        vm.tree_data = {};
        vm.my_tree = vm.tree = {};
        vm._filter = {};
        SkemaBudgetService.cariSemua({id: 'all'},
                function (data) {
                    vm.listSkemaBudget = data;
                    vm.data.skemaBudget = data[0];
                },
                function (error) {
                    AlertService.error(error.data.message);
                }
        );

        
        vm.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'id',
            titleClass: 'text-center',
            cellClass: 'v-middle',
            displayName: 'ID'
        };
        vm.col_defs = [
            {
                field: 'keterangan',
                displayName: 'Keterangan',
            },
            {
                field: 'budget',
                displayName: 'Budget',
                cellTemplate: '<span><bold>{{node.budget|number}}</bold></span>'
            },
            {
                titleStyle: {
                    'width': '80pt'
                },
                titleClass: 'text-center',
                cellClass: 'v-middle text-center',
                displayName: '',
                cellTemplate: '<a href="" ng-click="vm.ubah(node)" > <i class="glyphicon glyphicon-edit"></i> </a>  &nbsp; <a href="" ng-confirm-message="Anda yakin akan menghapus Program \'{{node.nama}}\'?" ng-confirm="vm.hapus(node)"> <i class="glyphicon glyphicon-remove"></i> </a>'
            }
        ];

        //loadAllFlat();

        function loadAllFlat() {
//            ProgramService.cariSemua({id: 'list-flat'}, onSuccess, onError);
//            function onSuccess(data) {
//                vm.dataFlat = data;
//                console.log('vm.dataFlat', vm.dataFlat);
//                vm.tree_data = $TreeDnDConvert.line2tree(vm.dataFlat, 'id', 'id_parent');
//            }
//            function onError(error) {
//                AlertService.error(error.data.message);
//            }
        }
        function lookupProgram() {
            console.log('Open modal');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/template/lookupProgramTree/lookup-program-tree.html',
                controller: 'LookupProgramTreeController',
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
                vm.data.program = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

})();

