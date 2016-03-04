"use strict";

describe('RelationOptionsFactoryTest', function() {
    var relationOptionsFactory;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_RelationOptionsFactory_) {
        relationOptionsFactory = _RelationOptionsFactory_;      
    }));

    it('should return cascadeOptions', function() {
        var cascadeOptions = relationOptionsFactory.getCascadeOptions();
        
        expect(cascadeOptions.length).toEqual(4);
    });
    
});