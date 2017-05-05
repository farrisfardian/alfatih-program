/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('Alfatih.pages.anggaran',[])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('anggaran', {
                    url: '/anggaran',
                    template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                    abstract: true,
                    title: 'Anggaran',
                    sidebarMeta: {
                        icon: 'ion-gear-a',
                        order: 100,
                    },
                });
    }

})();
