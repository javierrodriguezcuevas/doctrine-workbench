'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.directive('advancedOptions', function() {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {
                var $wrapper = $('#advanced-options-wrapper');
                $wrapper.draggable({
                    handle: ".item-move",
                    containment: "parent"
                });
                
                var $move = $(element).prev();
                $move.find('.item-header button').on('click', function(e) {
                    $(element).toggle();
                    $move.find('.item-move').toggleClass('border-bottom');
                    $wrapper.toggleClass('overflow-hidden');
                });
            }
        };
    });
    
})();