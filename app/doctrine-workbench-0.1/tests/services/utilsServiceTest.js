"use strict";

describe('UtilsServiceTest', function() {
    var utilsService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_UtilsService_) {
        utilsService = _UtilsService_;      
    }));

    it('should return UUID', function() {
        var uuid = utilsService.getUUID();
        
        expect(uuid.length).not.toBe(0);
    });

    it('should return foo-text to snakeCase', function() {
        var text = 'foo-text';
        expect(utilsService.toSnakeCase(text)).toEqual('foo_text');
    });
    
    it('should return foo text to camelCase', function() {
        var text = 'foo text';
        expect(utilsService.toCamelCase(text)).toEqual('fooText');
    });
    
});