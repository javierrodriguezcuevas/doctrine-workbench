DoctrineWorkbenchApp.directive('uniqueentityproperty', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            entity: '='
        },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                
                if (scope.$parent.$eval(attrs.uniqueentityproperty + '("' + viewValue + '", "' + scope.entity.id + '")')) {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('uniqueentityproperty', false);
                    return undefined;
                } else {
                    // it is valid
                    ctrl.$setValidity('uniqueentityproperty', true);
                    return viewValue;
                }
            });
        }
    };
});