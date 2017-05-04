/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Alfatih.theme.components')
      .directive('contentTop', contentTop);

  /** @ngInject */
  function contentTop($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/contentTop/contentTop.html',
      controller: 'ContentTopCtrl',
      controllerAs: 'vm',
      link: function($scope) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
      }
    };
  }

})();