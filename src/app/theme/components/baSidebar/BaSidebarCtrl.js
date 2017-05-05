/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('Alfatih.theme.components')
            .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    BaSidebarCtrl.$inject = ['$scope', '$rootScope', '$http', 'baSidebarService', 'Menu'];
    function BaSidebarCtrl($scope, $rootScope, $http, baSidebarService, Menu) {
        $scope.isAuthenticated = null;
//        Menu.loadMenu();
        $rootScope.menuItems = [
            {
                "name": "master", 
                "title": "Master", 
                "level": 0, "order": 100, 
                "icon": "ion-compose", 
                "stateRef": "master", 
                "subMenu": [
                    {
                        "name": "master.akun", 
                        "title": "Akun", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "master.akun"
                    }, 
                    {
                        "name": "master.matauang", 
                        "title": "matauang", 
                        "level": 1, 
                        "order": 100, 
                        "stateRef": "master.matauang"
                    }, 
                    {
                        "name": "master.sumberdana", 
                        "title": "Sumber Dana", 
                        "level": 1, 
                        "order": 200, 
                        "stateRef": "master.sumberdana"
                    }, 
                    {
                        "name": "master.donatur", 
                        "title": "Donatur", 
                        "level": 1, 
                        "order": 300, 
                        "stateRef": "master.donatur"
                    }, 
                    {
                        "name": "master.unit", 
                        "title": "Unit Organisasi", 
                        "level": 1, 
                        "order": 400, 
                        "stateRef": "master.unit"
                    }, 
                    {
                        "name": "master.tahunajaran", 
                        "title": "Tahun Ajaran", 
                        "level": 1, 
                        "order": 600, 
                        "stateRef": "master.tahunajaran"
                    }, 
                ]
            }, 
            {
                "name": "anggaran", 
                "title": "Anggaran", 
                "level": 0, 
                "order": 200, 
                "icon": "ion-calendar", 
                "stateRef": "anggaran", 
                "subMenu": [
                    {
                        "name": "anggaran.program", 
                        "title": "Program", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "anggaran.program"
                    }, 
                    {
                        "name": "anggaran.proyek", 
                        "title": "Proyek", 
                        "level": 1, 
                        "order": 100, 
                        "stateRef": "anggaran.proyek"
                    }, 
                ]
            }, 
            {
                "name": "transaksi", 
                "title": "Transaksi", 
                "level": 0, 
                "order": 300, 
                "icon": "ion-calculator", 
                "stateRef": "transaksi", 
                "subMenu": [
                    {
                        "name": "transaksi.bkm", 
                        "title": "Kas/Bank Masuk", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "transaksi.bkm"
                    }, 
                    {
                        "name": "transaksi.bkk", 
                        "title": "Kas/ Bank Keluar", 
                        "level": 1, 
                        "order": 100, 
                        "stateRef": "transaksi.bkk"
                    }, 
                    {
                        "name": "transaksi.jurnal", 
                        "title": "Jurnal", 
                        "level": 1, 
                        "order": 200, 
                        "stateRef": "transaksi.jurnal"
                    }, 
                    {
                        "name": "transaksi.um", 
                        "title": "Uang Muka", 
                        "level": 1, 
                        "order": 200, 
                        "stateRef": "transaksi.um"
                    }, 
                ]
            }, 
            {
                "name": "pengaturan", 
                "title": "Pengaturan", 
                "level": 0, 
                "order": 400, 
                "icon": "ion-settings", 
                "stateRef": "setting", 
                "subMenu": [
                    {
                        "name": "pengaturan.cabang", 
                        "title": "Cabang", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "pengaturan.cabang"
                    }, 
                ]
            },
            {
                "name": "laporan", 
                "title": "Laporan", 
                "level": 0, 
                "order": 500, 
                "icon": "ion-document", 
                "stateRef": "laporan", 
                "subMenu": [
                    {
                        "name": "laporan.keuangan", 
                        "title": "Keuangan", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "laporan.keuangan"
                    }, 
                    {
                        "name": "laporan.dashboard", 
                        "title": "Dashboard Keuangan", 
                        "level": 1, 
                        "order": 0, 
                        "stateRef": "laporan.dashboard"
                    }, 
                ]
            }
        ];
        
        $scope.hoverItem = function ($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.$on('$stateChangeSuccess', function () {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})();
