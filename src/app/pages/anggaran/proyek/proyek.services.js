(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran')
            .factory('ProyekService', ProyekService);

    /** @ngInject */
    ProyekService.inject = ['$http', '$resource'];

    function ProyekService($http, $resource) {
        var resourceUrl =  'api/anggaram/proyek/:id/:cari';

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

