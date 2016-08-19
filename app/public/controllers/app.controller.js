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
