"use strict";
/*
describe('plumbItemTest', function() {
    
    beforeEach(module("schemaCreatorApp"));
    
    describe('template', function() {
        var $scope, $compile;
        
        // Load the templates module
        beforeEach(module('templates'));
        
        // Angular strips the underscores when injecting
        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        }));
        
        it('welcome plumbItem', inject(function () {
            // $compile the template, and pass in the $scope.
            // This will find your directive and run everything
            var template = $compile('<div plumb-item class="item" ng-style="{\'left\': entity.x, \'top\': entity.y }" data-identifier="{{entity.id}}"></div>')($scope);

            $scope.entity = new Entity({
                id: '1',
                entityName: 'entityName1',
                tableName: 'tableName1',
                namespace: 'namespace'
            });
            $scope.$digest();

            var templateAsHtml = template.html();

            expect(templateAsHtml).toContain($scope.entity);
        }));
    });
});
*/