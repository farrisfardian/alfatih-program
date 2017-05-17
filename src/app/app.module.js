(function () {
    'use strict';

    angular.module('Alfatih', [
        'ngAnimate',
        'ngResource',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ngStorage',
        'ngCookies',
        'ae-datetimepicker',
//        'ngAria',
        'ngCacheBuster',
        'ngFileUpload',
        'infinite-scroll',
        'ui.bootstrap',
        'ui.sortable',
        'ui.router',
        'ngTouch',
        'toastr',
        'smart-table',
        "xeditable",
        'ui.slimscroll',
        'ngJsTree',
        'ui.select',
        'angular-progress-button-styles',
        'ntt.TreeDnD',
        'jqwidgets',
        'treeGrid',
        'ngBootbox',
        'Alfatih.theme',
        'Alfatih.pages'
    ])
            .run(run)

    run.$inject = ['stateHandler', '$rootScope', '$location', 'Auth'];

    function run(stateHandler) {
        stateHandler.initialize();
    }

})();