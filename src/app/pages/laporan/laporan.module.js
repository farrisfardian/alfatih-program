/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('Alfatih.pages.laporan',[])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('laporan', {
                    url: '/laporan',
                    template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                    abstract: true,
                    title: 'Laporan',
                    sidebarMeta: {
                        icon: 'ion-gear-a',
                        order: 100,
                    },
                });
    }

})();
