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
