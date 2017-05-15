(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi')
            .factory('AkadSumberDanaService', AkadSumberDanaService);

    /** @ngInject */
    AkadSumberDanaService.inject = ['$http', '$resource'];

    function AkadSumberDanaService($http, $resource) {
        var resourceUrl =  'api/akuntansi/akad-sumberdana/:id/:cari';

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

