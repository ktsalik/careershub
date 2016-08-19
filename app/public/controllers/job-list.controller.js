angular
  .module('CareersHub')
  .controller('JobListController', JobListController);
  
JobListController.$inject = ['$stateParams', 'getJobs', '$http', '$httpParamSerializer', '$anchorScroll'];

function JobListController($stateParams, getJobs, $http, $httpParamSerializer, $anchorScroll) {
  var vm = this;
  
  vm.jobs = {
    count: getJobs.count,
    items: getJobs.jobs,
    page: 1,
    categories: $stateParams.category && $stateParams.category.split(','),
    loadingMore: false,
    keyword: $stateParams.q
  };
  
  $stateParams.page = 1;
  
  vm.loadMore = function() {
    vm.jobs.loadingMore = true;
    $stateParams.page++;
    $http.get('/api/jobs?' + $httpParamSerializer($stateParams)).then(function(response) {
      response.data.jobs.forEach(function(job) {
        var titleParts = job.title.split('at');
        job.title = titleParts[0];
        job.at = titleParts[1];
        vm.jobs.items.push(job);
      });
      vm.jobs.loadingMore = false;
    });
  };
  
  $anchorScroll();
}
