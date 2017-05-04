(function () {
    'use strict';

    angular.module('Alfatih.pages.master')
            .factory('KelompokAkunService', KelompokAkunService);

    /** @ngInject */
    KelompokAkunService.inject = ['$http', '$resource'];

    function KelompokAkunService($http, $resource) {
        var url = 'api/akuntansi/kelompok-akun';
        return {
            entity: $resource(url + '/:a', {}, {
                queryPage: {method: 'GET', isArray: false}
            }),
            query: function (search, p, callback) {
                return this.entity.queryPage({"a": search, "page": p, "size": 10}, callback)
            },
            simpan: simpan,
            cariSatu: cariSatu,
            cariSemua: cariSemua,
            hapus: hapus,
        }

//        return service;

        ;

        function simpan(data, ori) {
            if (ori.id == undefined || ori.id == null) {
                return $http.post(url, data)
            } else {
                return $http.put(url + '/' + ori.id, data)
            }
        }
        function cariSatu(column, id) {
            return $http.get(url + '/cek?col=' + column + '&val=' + id);
        }
        function cariSemua() {
            return $http.get(url + '/all');
        }
        function hapus(obj) {
            if (obj.id != null) {
                return $http.delete(url + "/" + obj.id);
            }
        }
    }

})();

