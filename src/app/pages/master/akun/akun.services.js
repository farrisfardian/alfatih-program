(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .factory('AkunService', AkunService);

    /** @ngInject */
    AkunService.inject = ['$http', '$resource'];

    function AkunService($http, $resource) {
        var resourceUrl = 'api/akuntansi/akun/:id/:cari';

        return $resource(resourceUrl, {id: "@id", cari: "@cari"}, {
            'query': {method: 'GET', isArray: true
                , transformResponse: function (data, header) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': {method: 'PUT'},
            'cariSatu': {method: 'GET'},
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

