"use strict";

describe('FieldServiceTest', function() {
    var fieldService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_FieldService_) {
        fieldService = _FieldService_;
        
        var fields = new Array();
        
        for (var i = 1; i < 4; i++) {
            fields.push(fieldService.createEmptyField(i, "fieldName" + i, "tableName" + i));
        }
        
        fieldService.load(fields);
    }));
    
    it('should return load files', function() {
        var fields = new Array();
        
        for (var i = 1; i < 6; i++) {
            fields.push(fieldService.createEmptyField(i, "fieldName" + i, "tableName" + i));
        }
        
        fieldService.load(fields);
        
        expect(fieldService.findAll().length).toEqual(5);
    });

    it('should return all', function() {
        var fields = fieldService.findAll();
        expect(fields.length).toEqual(3);
    });
    
    it('should return default Field', function() {
        var field = fieldService.findDefaultField();
        expect(field.id).toEqual(1);
    });
    
    it('should not return default Field', function() {
        var fields = new Array();
        fieldService.load(fields);
        var field = fieldService.findDefaultField();
        expect(field).toEqual(null);
    });
    
    it('should return Field with id 1', function() {
        var id = 1;
        var field = fieldService.findById(id);
        expect(field.id).toEqual(id);
    });
    
    it('should exist Field by fieldName', function() {
        var fieldName = "fieldName1";
        expect(fieldService.existsByFieldName(fieldName)).toEqual(true);
    });
    
    it('should not exist Field by fieldName', function() {
        var fieldName = "fieldNameFoo";
        expect(fieldService.existsByFieldName(fieldName)).toEqual(false);
    });
    
    it('should exist Field by tableName', function() {
        var tableName = "tableName1";
        expect(fieldService.existsByTableName(tableName)).toEqual(true);
    });
    
    it('should not exist Field by tableName', function() {
        var tableName = "tableNameFoo";
        expect(fieldService.existsByTableName(tableName)).toEqual(false);
    });
    
    it('should create a pk Field and return it', function() {
        var id = 5;
        var field = fieldService.createEmptyPkField(id, "fieldName5", "tableName5");
        expect(field.id).toEqual(id);
    });
    
    it('should create an empty Field and return it', function() {
        var id = 5;
        var field = fieldService.createEmptyField(id, "fieldName5", "tableName5");
        expect(field.id).toEqual(id);
    });
    
    it('should create a Relation Field and return it', function() {
        var id = 5;
        var field = fieldService.createRelationField(id, "fieldName5", 42);
        expect(field.id).toEqual(id);
    });
    
    it('should create a Field, add to collection and return it', function() {
        var id = 5;
        fieldService.add(fieldService.createRelationField(id, "fieldName5", 42));
        var field = fieldService.findById(id);
        expect(field.id).toEqual(id);
    });
    
    it('should update a Field and return it updated', function() {
        var id = 1;
        var fooName = "entityNameFoo";
        var field = fieldService.findById(id);
        field.name = fooName;
        fieldService.update(field);
        field = fieldService.findById(id);
        expect(field.name).toEqual(fooName);
    });
    
    it('should remove a Field', function() {
        expect(fieldService.findAll().length).toEqual(3);
        var id = 1;
        fieldService.remove(id);
        expect(fieldService.findAll().length).toEqual(2);
    });
    
});