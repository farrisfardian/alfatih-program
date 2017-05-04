/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('Alfatih.theme.components')
            .controller('ContentTopCtrl', ContentTopCtrl);

    /** @ngInject */
    function ContentTopCtrl(Auth) {
        var vm = this;
        vm.isAuthenticated = Auth.isAuthenticated;
    }
})();
