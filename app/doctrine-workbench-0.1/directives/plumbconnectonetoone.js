DoctrineWorkbenchApp.directive('plumbConnectOneToOne', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            // console.log("Add plumbing OneToOne for element: ", element);
            var endpointOptions = $.extend({}, connectorCommonOptions, {
                isSource:true, 
                hoverClass: 'oneToOneHover',
                connectorHoverClass: 'oneToOneHover',
                connectorOverlays: overlaysOneToOne,
                filter: function(event, element) {
                    var target = (event.target.tagName !== 'SPAN') ? event.target.parentNode : event.target;
                    return $(target).hasClass('one-to-one');
                }
            });
            
            jsPlumb.makeSource(element.parents('.item:first'), endpointOptions);
        }
    };
});