DoctrineWorkbenchApp.directive('uniquefieldname', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (scope.$parent.$eval(attrs.uniquefieldname + '("' + viewValue + '", "' + scope.field._id + '")')) {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('uniquefieldname', false);
                    return undefined;
                } else {
                    // it is valid
                    ctrl.$setValidity('uniquefieldname', true);
                    return viewValue;
                }
            });
        }
    };
});