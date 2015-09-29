
/**
 * Directive to render the carousel
 */
techarms.directive('taCarousel', [function () {
  return {    
    restrict: 'E',
    templateUrl: '/modules/directives/carousel.html',
    scope: {
      isNav: '=',
      carousel: '='
    }
  };
}
]);
