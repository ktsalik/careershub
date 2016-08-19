angular
  .module('CareersHub')
  .controller('AppController', AppController);
  
AppController.$inject = ['$http'];

function AppController($http) {
  var vm = this;
  
  vm.statistics = {};
  
  $http.get('/api').then(function(response) {
    vm.statistics = response.data.statistics;
  });
}

angular
  .module('CareersHub')
  .controller('IndexController', IndexController);
  
IndexController.$inject = ['getLatest', '$state'];

function IndexController(getLatest, $state) {
  var vm = this;
  
  vm.jobs = {
    latest: getLatest
  };
  
  vm.search = {
    keyword: ''
  };
  
  vm.doSearch = function() {
    $state.go('jobs', { q: vm.search.keyword });
  };
}

angular
  .module('CareersHub')
  .controller('JobDetailController', JobDetailController);
  
JobDetailController.$inject = ['getJob', '$location', '$anchorScroll'];

function JobDetailController(getJob, $location, $anchorScroll) {
  var vm = this;
  
  vm.job = getJob;
  
  vm.copyLink = function() { // copy to clipboard hack
    var fakeElement = document.createElement('input');
    angular.element(fakeElement).css({
      position: 'fixed',
      left: -9999,
      top: -9999
    }).val($location.absUrl());
    document.body.appendChild(fakeElement);
    fakeElement.select();
    document.execCommand('copy');
    fakeElement.remove();
    Messenger().post({ type: 'success', message: "Copied link to your clipboard", hideAfter: 2 });
  };
  
  $anchorScroll();
}

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
