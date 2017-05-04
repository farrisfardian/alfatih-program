/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('Alfatih.pages.master',[])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('master', {
                    url: '/master',
                    template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                    abstract: true,
                    title: 'Master',
                    sidebarMeta: {
                        icon: 'ion-gear-a',
                        order: 100,
                    },
                });
    }

})();
