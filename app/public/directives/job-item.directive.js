angular
  .module('CareersHub')
  .directive('jobItem', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        job: '='
      },
      templateUrl: 'templates/job-item.html'
    };
  });
