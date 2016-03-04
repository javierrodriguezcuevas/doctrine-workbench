"use strict";

describe('FieldOptionsFactoryTest', function() {
    var fieldOptionsFactory;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_FieldOptionsFactory_) {
        fieldOptionsFactory = _FieldOptionsFactory_;      
    }));

    it('should return fileTypes', function() {
        var fieldTypes = fieldOptionsFactory.getFieldTypes();
        
        expect(fieldTypes.length).toEqual(11);
    });
    
    it('should return strategies', function() {
        var fieldTypes = fieldOptionsFactory.getStrategies();
        
        expect(fieldTypes.length).toEqual(6);
    });
    
});