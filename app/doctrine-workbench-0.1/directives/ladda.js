DoctrineWorkbenchApp.directive('ladda', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $timeout(function(){
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
            }, 0);
        }
    };
}]);