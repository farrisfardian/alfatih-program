/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('Alfatih.theme.components')
            .controller('ModalConfirmCtrl', ModalConfirmCtrl);

    /** @ngInject */
    function ModalConfirmCtrl($scope, $uibModalInstance, confirmClick, confirmMessge) {
        $scope.confirmMessage = confirmMessge;
        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.ok = function () {
            confirmClick();
            closeModal();
        }

        $scope.cancel = function () {
            closeModal();
        }
    }
})();
