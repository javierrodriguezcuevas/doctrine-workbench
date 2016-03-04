"use strict";

describe('ValidatorBeforeDropTest', function() {
    var validatorBeforeDrop;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_ValidatorBeforeDrop_, _EntityService_, _RelationService_) {
        validatorBeforeDrop = _ValidatorBeforeDrop_;
        
        spyOn(_EntityService_, 'findById').and.returnValue({'fields': new Array()});
        spyOn(_RelationService_, 'existsRelation').and.returnValue(true);
    }));
    
    it('should return false because same entity', function() {
        var sourceId = 1;
        var targetId = sourceId;
        var result = validatorBeforeDrop.validate(sourceId, targetId);
        expect(result).toEqual(false);
    });
    
    it('should return false because exists relation', function() {
        var sourceId = 1;
        var targetId = 2;
        var result = validatorBeforeDrop.validate(sourceId, targetId);
        expect(result).toEqual(false);
    });
    
    it('should return false because no target fields', function() {
        var sourceId = 1;
        var targetId = 2;
        var result = validatorBeforeDrop.validate(sourceId, targetId);
        expect(result).toEqual(false);
    });
    
});