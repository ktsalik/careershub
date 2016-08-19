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
