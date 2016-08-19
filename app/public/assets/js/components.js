angular
  .module('CareersHub')
  .component('jobCategory', {
    template: '<div class="job-category tag is-primary is-{{$ctrl.size}}"><a ui-sref="jobs({ category: $ctrl.name })">{{$ctrl.name}}</a></div>',
    bindings: {
      name: '@',
      size: '@'
    }
  });