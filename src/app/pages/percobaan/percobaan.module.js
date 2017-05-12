/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('Alfatih.pages.percobaan',[])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('percobaan', {
                    url: '/percobaan',
                    template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                    abstract: true,
                    title: 'Percobaan',
                    sidebarMeta: {
                        icon: 'ion-gear-a',
                        order: 100,
                    },
                });
    }

})();
