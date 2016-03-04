'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('DraggableWorkbenchService', [function () {
        
        var clickEvent = null;
        
        function startDraggable() {
            
            var myDraggable = $("#workbench").draggable();
            var widget = myDraggable.data('ui-draggable');
            
            $('#workbench-wrapper')
                .mousedown(function(e) {
                    if ('workbench' === e.target.id || 'workbench-wrapper' === e.target.id) {
                        widget._mouseStart(e);
                        clickEvent = e;
                        $(e.target).addClass('workbench-drag-cursor');
                    }
                })
                .mouseup(function(e) {
                    if ('workbench' === e.target.id || 'workbench-wrapper' === e.target.id) {
                        clickEvent = null;
                        widget._mouseUp(e);
                        $(e.target).removeClass('workbench-drag-cursor');
                    }
                })
                .mousemove(function(e) {
                    if (null != clickEvent) {
                        // We need to set this to our own clickEvent, otherwise
                        // it won't position correctly.
                        widget._mouseDownEvent = clickEvent;
                        widget._mouseMove(e);
                    }
                })
            ;
        };
 
        return {
            start: startDraggable
        };
    }]);
 
})();