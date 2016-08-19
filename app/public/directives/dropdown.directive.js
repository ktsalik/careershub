angular
  .module('CareersHub')
  .directive('dropdown', function() {
    return {
      restrict: 'A',
      replace: 'element',
      link: function(scope, element, attrs) {
        var target = element[0].previousElementSibling;
        
        var initialDisplay = element.css('display');
        element.css('display', 'none');
        
        var attachment = new Tether({
          element: element[0],
          target: target,
          attachment: 'top left',
          targetAttachment: 'bottom left',
          // offset: '-10px 0',
          constraints: [
            {
              to: 'scrollParent',
              attachment: 'together'
            }
          ]
        });
        
        if (attrs.trigger == 'click') {
          document.documentElement.addEventListener('click', function(e) {
            if (e.clientX >= target.offsetLeft 
                && e.clientX <= target.offsetLeft + target.offsetWidth
                && e.clientY >= target.offsetTop
                && e.clientY <= target.offsetTop + target.offsetHeight) {
              if (element[0].style.display === 'none') {
                element.css('display', initialDisplay);
              } else {
                element.css('display', 'none');
              }
            } else {
              element.css('display', 'none');
            }
          });
        } else {
          target.addEventListener('mouseover', function() {
            element.css('display', initialDisplay);
          });
          
          target.addEventListener('mouseout', function() {
            element.css('display', 'none');
          });  
        }
      }
    };
  });
