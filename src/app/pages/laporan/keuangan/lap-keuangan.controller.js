(function () {
    'use strict';

    angular.module('Alfatih.pages.laporan')
            .controller('LaporanKeuanganController', LaporanKeuanganController)

    /** @ngInject */
    function LaporanKeuanganController() {
        var vm = this;
        $(document).ready(function () {
               var source = [
                // Utama
                    {html: "<div><div>Posisi Keuangan</div></div>", title: "Posisi Keuangan", group: "Utama" },
                    { html: "<div><div>Aktivitas</div></div>", title: "Aktivitas", group: "Utama" },
                    { html: "<div><div>Arus Kas</div>", title: "Atus Kas", group: "Utama" },
                // Umum
                    {html: "<div><div>Buku Besar</div></div>", title: "Buku Besar", group: "Umum" },
                    {html: "<div><div>Buku Kas</div></div>", title: "Buku Kasr", group: "Umum" },
                    {html: "<div><div>Buku Bank</div></div>", title: "Buku Bank", group: "Umum" },
                    {html: "<div><div>Neraca Percobaan</div></div>", title: "Neraca Percobaan", group: "Umum" },
                    {html: "<div><div>Transaksi</div></div>", title: "Transaksi", group: "Umum" },
                    {html: "<div><div>Aktiva Tetap</div></div>", title: "Aktiva Tetap", group: "Umum" },
                // Kegiatan
                    {html: "<div><div>Daftar Sumbangan</div></div>", title: "Daftar Sumbangan", group: "Kegiatan" },
                    {html: "<div><div>Status Anggaran Program</div></div>", title: "Status Anggaran Program", group: "Kegiatan" },
                    {html: "<div><div>Status Anggaran Proyek</div></div>", title: "Status Anggaran Proyek", group: "Kegiatan" },
                    {html: "<div><div>Penerimaan dan Pengeluaran Dana</div></div>", title: "Penerimaan dan Pengeluaran Dana", group: "Kegiatan" },
                    {html: "<div><div>Buku Kas Program</div></div>", title: "Buku Kas Program", group: "Kegiatan" },
                    {html: "<div><div>Status Dana Program</div></div>", title: "Status Dana Program", group: "Kegiatan" },
                 ];

                // Create a jqxListBox
                $("#jqxWidget").jqxListBox({ source: source, width: 300, height: 350});
            });

    }

})();

