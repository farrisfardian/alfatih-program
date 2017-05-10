(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .factory('BuktiKasService', BuktiKasService);

    /** @ngInject */
    BuktiKasService.inject = ['$http', '$resource'];

    function BuktiKasService($http, $resource) {
        var resourceUrl =  'api/akuntansi/bukti-kas/:id/:cari';

        return $resource(resourceUrl, {id: "@id", cari: "@cari"}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'cariSemua': {
                method: 'GET', isArray: true,
                transformResponse: function (data, header) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;

                }
            }
        });
    }

})();

