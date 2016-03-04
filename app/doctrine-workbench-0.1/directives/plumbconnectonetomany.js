DoctrineWorkbenchApp.directive('plumbConnectOneToMany', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            // console.log("Add plumbing OneToMany for element: ", element);
            var endpointOptions = $.extend({}, connectorCommonOptions, {
                isSource:true, 
                hoverClass: 'oneToManyHover',
                connectorHoverClass: 'oneToManyHover',
                connectorOverlays: overlaysOneToMany,
                filter: function(event, element) {
                    var target = (event.target.tagName !== 'SPAN') ? event.target.parentNode : event.target;
                    return $(target).hasClass('one-to-many');
                }
            });
            
            jsPlumb.makeSource(element.parents('.item:first'), endpointOptions);
        }
    };
});