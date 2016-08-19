angular
  .module('CareersHub')
  .directive('publisherImage', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        publisher: '@'
      },
      template: '<img class="publisher-image" src="{{imagePath}}">',
      link: function(scope, element, attrs) {
        switch (scope.publisher) {
          case 'stackoverflow':
            scope.imagePath = 'http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d';
            break;
        }
      }
    };
  });
