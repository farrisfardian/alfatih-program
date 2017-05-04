/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';
    angular.module('Alfatih.theme.components')
            .directive('ngConfirm', ngConfirm);
    /** @ngInject */
    function ngConfirm($uibModal) {
        return {
            restrict: 'A',
            scope: {
                ngConfirmMessage: '@',
                ngConfirm: '&'
            },
            link: function (scope, element) {
                element.bind('click', function () {
                    var modalInstance = $uibModal.open({
                        template: '<div class="modal-header"><h4 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">Ya</button><button class="btn btn-warning" type="button" ng-click="cancel()">Tidak</button></div>',
                        controller: 'ModalConfirmCtrl',
                        size: 'md',
                        windowClass: 'confirm-window',
                        resolve: {
                            confirmClick: function () {
                                return scope.ngConfirm;
                            },
                            confirmMessge: function () {
                                return scope.ngConfirmMessage;
                            }
                        }
                    });
                });
            }
        }
    }
})();
;