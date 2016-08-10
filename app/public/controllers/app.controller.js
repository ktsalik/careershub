angular
  .module('CareersHub')
  .controller('AppController', AppController);
  
AppController.$inject = [];

function AppController() {
  var vm = this;
  
  vm.test = 'test';
}
