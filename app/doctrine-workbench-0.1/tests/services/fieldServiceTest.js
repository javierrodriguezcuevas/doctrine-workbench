"use strict";

describe('FieldServiceTest', function() {
    var fieldService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_FieldService_) {
        fieldService = _FieldService_;
        
        var fields = new Array();
        
        for (var i = 1; i < 4; i++) {
            fields.push(fieldService.createEmptyField(i, "fieldName" + i, "table_name_" + i));
        }
        
        fieldService.load(fields);
    }));
    
    it('should return load files', function() {
        var fields = new Array();
        
        for (var i = 1; i < 6; i++) {
            fields.push(fieldService.createEmptyField(i, "fieldName" + i, "table_name_" + i));
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
        expect(field._id).toEqual(1);
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
        expect(field._id).toEqual(id);
    });
    
    it('should exist Field by fieldName', function() {
        var fieldName1 = "fieldName1";
        var fieldName2 = "fieldname1";
        var fieldName3 = "FieldName1";
        var fieldName4 = "Fieldname1";
        
        expect(fieldService.existsByFieldName(fieldName1)).toEqual(true);
        expect(fieldService.existsByFieldName(fieldName2)).toEqual(true);
        expect(fieldService.existsByFieldName(fieldName3)).toEqual(true);
        expect(fieldService.existsByFieldName(fieldName4)).toEqual(true);
    });
    
    it('should not exist Field by fieldName', function() {
        var fieldName = "fieldNameFoo";
        
        expect(fieldService.existsByFieldName(fieldName)).toEqual(false);
    });
    
    it('should exist Field by tableName', function() {
        var tableName1 = "table_Name_1";
        var tableName2 = "table_name_1";
        var tableName3 = "Table_Name_1";
        var tableName4 = "Table_name_1";
        
        expect(fieldService.existsByTableName(tableName1)).toEqual(true);
        expect(fieldService.existsByTableName(tableName2)).toEqual(true);
        expect(fieldService.existsByTableName(tableName3)).toEqual(true);
        expect(fieldService.existsByTableName(tableName4)).toEqual(true);
    });
    
    it('should not exist Field by tableName', function() {
        var tableName = "tableNameFoo";
        expect(fieldService.existsByTableName(tableName)).toEqual(false);
    });
    
    it('should create a pk Field and return it', function() {
        var id = 5;
        var field = fieldService.createEmptyPkField(id, "fieldName5", "tableName5");
        expect(field._id).toEqual(id);
    });
    
    it('should create an empty Field and return it', function() {
        var id = 5;
        var field = fieldService.createEmptyField(id, "fieldName5", "tableName5");
        expect(field._id).toEqual(id);
    });
    
    it('should create a Field, add to collection and return it', function() {
        var id = 5;
        fieldService.add(fieldService.createEmptyField(id, "fieldName5", 42));
        var field = fieldService.findById(id);
        expect(field._id).toEqual(id);
    });
    
    it('should update a Field and return it updated', function() {
        var id = 1;
        var fooName = "entityNameFoo";
        var field = fieldService.findById(id);
        field.fieldName = fooName;
        fieldService.update(field);
        field = fieldService.findById(id);
        expect(field.fieldName).toEqual(fooName);
    });
    
    it('should remove a Field', function() {
        expect(fieldService.findAll().length).toEqual(3);
        var id = 1;
        fieldService.remove(id);
        expect(fieldService.findAll().length).toEqual(2);
    });
    
    it('should return fieldNames', function() {
        var fieldNames = fieldService.getFieldNames();
        
        expect(fieldNames).toEqual([{ table_name_1: 'fieldName1' }, { table_name_2: 'fieldName2' }, { table_name_3: 'fieldName3' }]);
    });
    
    it('should return columnNames', function() {
        var columnNames = fieldService.getColumnNames();
        
        expect(columnNames).toEqual([{ fieldName1: 'table_name_1' }, { fieldName2: 'table_name_2' }, { fieldName3: 'table_name_3' }]);
    });
});