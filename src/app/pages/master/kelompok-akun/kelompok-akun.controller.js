(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .controller('KelompokAkunController', KelompokAkunController);

    /** @ngInject */
    function KelompokAkunController($scope, $uibModal, $log, toastr, KelompokAkunService, EnumService) {
        $scope.search = "";
        $scope.oldSearch = "";
        $scope.modalTitle = "";
        $scope.paging = {
            currentPage: 1,
            totalItems: 0
        };
        $scope.vm = {};
        $scope.ori = {};

        $scope.reloadData = function () {
            $scope.dataPage = KelompokAkunService.query($scope.search, $scope.paging.currentPage - 1, function () {
                $scope.paging.maxSize = ($scope.dataPage.size);
                $scope.paging.totalItems = $scope.dataPage.totalElements;
                $scope.paging.currentPage = parseInt($scope.dataPage.number) + 1;
                $scope.paging.maxPage = $scope.dataPage.totalPages;
                console.log('$scope.dataPage', $scope.dataPage);
            });
        };

        EnumService.kelompokAkun().success(function (data) {
            $scope.listKelompok = data;
        });

        $scope.reloadData();

        $scope.clear = function () {
            $scope.modalTitle = "";
            $scope.vm = {};
            $scope.ori = {};
            $scope.reloadData();
        };

        $scope.baru = function () {
            $scope.modalTitle = "Tambah KelompokAkun";
            $scope.vm = {};
            $scope.ori = {};
            console.log('Baru');
        };

        $scope.edit = function (x) {
            $scope.ori = angular.copy(x);
            $scope.modalTitle = "Edit KelompokAkun";
            console.log('edit', x);
            $scope.vm = angular.copy(x);
        };

        $scope.hapus = function (x) {
            KelompokAkunService.hapus(x).success(function () {
                toastr.success('Hapus data sukses!');
                $scope.reloadData();
            });
        };

        $scope.simpan = function () {
            KelompokAkunService.simpan($scope.vm, $scope.ori).success(function (d) {
                toastr.success('Simpan data sukses!');
                $scope.clear();
            });
        };
    }

})();

