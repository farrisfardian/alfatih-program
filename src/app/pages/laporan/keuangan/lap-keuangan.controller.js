(function () {
    'use strict';

    angular.module('Alfatih.pages.laporan')
            .controller('LaporanKeuanganController', LaporanKeuanganController)

    /** @ngInject */
    function LaporanKeuanganController($scope) {
        var vm = this;
        $scope.tipeSumberDana = 'konsolidasi';
        $scope.tipePeriode = 'bulanan';
        $scope.reportLabel = 'Posisi Keuangan';
        $scope.listBulan = [
            {kode: '01', nama: 'Januari'},
            {kode: '02', nama: 'Februari'},
            {kode: '03', nama: 'Maret'},
            {kode: '04', nama: 'April'},
            {kode: '05', nama: 'Mei'},
            {kode: '06', nama: 'Juni'},
            {kode: '07', nama: 'Juli'},
            {kode: '08', nama: 'Agustus'},
            {kode: '09', nama: 'September'},
            {kode: '10', nama: 'Oktober'},
            {kode: '11', nama: 'November'},
            {kode: '12', nama: 'Desember'}
        ];
        $scope.param = {
            tahun: new Date().getFullYear()
        };
        var source = [
            // Utama
            {html: "<div><div>Posisi Keuangan</div></div>", title: "Posisi Keuangan", group: "Utama"},
            {html: "<div><div>Aktivitas</div></div>", title: "Aktivitas", group: "Utama"},
            {html: "<div><div>Arus Kas</div>", title: "Arus Kas", group: "Utama"},
            // Umum
            {html: "<div><div>Buku Besar</div></div>", title: "Buku Besar", group: "Umum"},
            {html: "<div><div>Buku Kas</div></div>", title: "Buku Kas", group: "Umum"},
            {html: "<div><div>Buku Bank</div></div>", title: "Buku Bank", group: "Umum"},
            {html: "<div><div>Neraca Percobaan</div></div>", title: "Neraca Percobaan", group: "Umum"},
            {html: "<div><div>Transaksi</div></div>", title: "Transaksi", group: "Umum"},
            {html: "<div><div>Aktiva Tetap</div></div>", title: "Aktiva Tetap", group: "Umum"},
            // Kegiatan
            {html: "<div><div>Daftar Sumbangan</div></div>", title: "Daftar Sumbangan", group: "Kegiatan"},
            {html: "<div><div>Status Anggaran Program</div></div>", title: "Status Anggaran Program", group: "Kegiatan"},
            {html: "<div><div>Status Anggaran Proyek</div></div>", title: "Status Anggaran Proyek", group: "Kegiatan"},
            {html: "<div><div>Penerimaan dan Pengeluaran Dana</div></div>", title: "Penerimaan dan Pengeluaran Dana", group: "Kegiatan"},
            {html: "<div><div>Buku Kas Program</div></div>", title: "Buku Kas Program", group: "Kegiatan"},
            {html: "<div><div>Status Dana Program</div></div>", title: "Status Dana Program", group: "Kegiatan"},
        ];
        $scope.settings = {source: source, width: 370, height: 340};
        $scope.onSelect = function (event) {
            console.log('onselect event', event);
            var args = event.args;
            if (args) {
                $scope.reportLabel = event.args.item.originalItem.title;
                console.log('reportLabel', $scope.reportLabel);
            }
        };

        $scope.onUnselect = function (event) {
            console.log('onunselect event', event);
            var args = event.args;
            if (args && args.item) {
                $scope.unselectLog = 'Unselected: ' + args.item.label;
                console.log('selectLog', $scope.unselectLog);
            }
        };
        $(document).ready(function () {

            // Create a jqxListBox
//            $("#jqxListBox").jqxListBox({source: source, width: 370, height: 340});
//            $('#jqxListBox').on('select', function (event) {
//                var args = event.args;
//                console.log('select', args);
////                if (args) {
////                    var index = args.index;
//                    var item = args.item;
////                    var originalEvent = args.originalEvent;
//                    // get item's label and value.
//                    $scope.reportLabel = item.label;
////                    alert("label: " + $scope.reportLabel);
//                    console.log('reportLabel', $scope.reportLabel);
////                    var value = item.value;
////                    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
////                }
//            });
        });

    }

})();

