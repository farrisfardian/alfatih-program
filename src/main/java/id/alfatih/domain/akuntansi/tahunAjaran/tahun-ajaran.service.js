(function () {
    'use strict';

    angular.module('Alfatih.pages.akuntansi.daftar')
            .factory('TahunAjaranService', TahunAjaranService);

    /** @ngInject */
    TahunAjaranService.inject = ['$http', '$resource'];

    function TahunAjaranService($http, $resource) {
        var resourceUrl = 'api/akademik/tahun-ajaran/';

        return $resource(resourceUrl + ':id', {id: "@id"}, {
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

