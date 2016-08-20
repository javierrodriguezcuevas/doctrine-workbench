'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.directive('plumbItem', function() {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {
                
                var connectorOptions = $.extend({}, connectorCommonOptions, {
                    isTarget:true, 
                    isSource:true, 
                    allowLoopback: true
                });
                
                // console.log("Creating plumbItem from element: ", element);
                jsPlumb.makeTarget(element, connectorOptions);

                // need to refresh items positions
                setTimeout(function() {
                    // console.log("Making plumbItem draggable");
                    jsPlumb.draggable(element, {
                        handle: '.item-move',
                        stop: function(e) {
                            scope.entity._x = e.pos[0];
                            scope.entity._y = e.pos[1];
                        }
                    });
                }, 0);
            }
        };
    });
    
})();