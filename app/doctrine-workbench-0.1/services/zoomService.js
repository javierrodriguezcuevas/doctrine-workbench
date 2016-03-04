'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.service('ZoomService', function () {
        
        /**
         * Change workbench zoom
         * @param float zoom
         */
        function changeZoom(zoom) {
            var transformOrigin = [ 0.5, 0.5 ]; // transformOrigin ||;
            //transformOrigin = transformOrigin || [ 0.5, 0, 0, -1, 0, 12 ];
            var instance = jsPlumb; // instance ||;
            var el = instance.getContainer(); // el ||;
            var p = [ "webkit", "moz", "ms", "o" ],
                s = "scale(" + zoom + ")",
                oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

            for (var i = 0; i < p.length; i++) {
              el.style[p[i] + "Transform"] = s;
              el.style[p[i] + "TransformOrigin"] = oString;
            }

            el.style["transform"] = s;
            el.style["transformOrigin"] = oString;

            instance.setZoom(zoom);
            jsPlumb.repaintEverything();
        }
 
        return {
            changeZoom: changeZoom
        };
    });

})();