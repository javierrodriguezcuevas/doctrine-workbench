DoctrineWorkbenchApp.directive('plumbConnectManyToMany', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            // console.log("Add plumbing ManyToMany for element: ", element);
            var endpointOptions = $.extend({}, connectorCommonOptions, {
                isSource:true, 
                hoverClass: 'manyToManyHover',
                connectorHoverClass: 'manyToManyHover',
                connectorOverlays: overlaysManyToMany,
                filter: function(event, element) {
                    var target = (event.target.tagName !== 'SPAN') ? event.target.parentNode : event.target;
                    return $(target).hasClass('many-to-many');
                }
            });
            jsPlumb.makeSource(element.parents('.item:first'), endpointOptions);
        }
    };
});