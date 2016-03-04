DoctrineWorkbenchApp.directive('uniqueentityname', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                if (scope.$eval(attrs.uniqueentityname + '("' + viewValue + '", "' + scope.entity.id + '")')) {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('uniqueentityname', false);
                    return undefined;
                } else {
                    // it is valid
                    ctrl.$setValidity('uniqueentityname', true);
                    return viewValue;
                }
            });
        }
    };
});