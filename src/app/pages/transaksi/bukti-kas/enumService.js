(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .factory('EnumService', EnumService);

    /** @ngInject */
    EnumService.inject = ['$http', '$resource'];

    function EnumService($http, $resource) {
        var url = 'api/enum';
        return {
            kelompokAkun: kelompokAkun,
            tipeBuktiKas: tipeBuktiKas
        };
        function kelompokAkun() {
            return $http.get(url + '/kelompok-akun');
        }
        function tipeBuktiKas() {
            return $http.get(url + '/tipe-bukti-kas');
        }
    }

})();

