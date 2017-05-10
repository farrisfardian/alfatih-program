/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('Alfatih.pages.transaksi',[])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('transaksi', {
                    url: '/transaksi',
                    template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                    abstract: true,
                    title: 'Setting',
                    sidebarMeta: {
                        icon: 'ion-gear-a',
                        order: 100,
                    },
                });
    }

})();
