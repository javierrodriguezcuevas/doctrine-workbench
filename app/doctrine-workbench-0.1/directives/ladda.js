DoctrineWorkbenchApp.directive('ladda', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (element && element[0]) {
                var l = Ladda.create(element[0]);
                scope.$watch(attrs.ladda, function(newVal, oldVal) {
                    if (newVal !== undefined) {
                        if (newVal)
                            l.start();
                        else
                            l.stop();
                    }
                });
            }
        }
    };
});