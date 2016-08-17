"use strict";

describe('EntityServiceTest', function() {
    var entityService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_EntityService_) {
        entityService = _EntityService_;
        
        entityService.clear();
        for (var i = 1; i < 5; i++) {
            entityService.add(entityService.create(i, "entityName" + i, "tableName" + i, "namespace"));
        }        
    }));

    it('should return all', function() {
        var entities = entityService.findAll();
        
        expect(entities.length).toEqual(4);
    });
    
    it('should return Entity with id 1', function() {
        var id = 1;
        var entity = entityService.findById(id);
        
        expect(entity._id).toEqual(id);
    });
    
    it('should not return Entity with id foo', function() {
        var id = 'foo';
        var entity = entityService.findById(id);
        
        expect(entity).toEqual(undefined);
    });
    
    it('should exist Entity by entityName', function() {
        var entityName1 = "entityName1";
        var entityName2 = "entityname1";
        var entityName3 = "EntityName1";
        var entityName4 = "Entityname1";
        
        expect(entityService.existsByEntityName(entityName1)).toEqual(true);
        expect(entityService.existsByEntityName(entityName2)).toEqual(true);
        expect(entityService.existsByEntityName(entityName3)).toEqual(true);
        expect(entityService.existsByEntityName(entityName4)).toEqual(true);
    });
    
    it('should not exist Entity by entityName', function() {
        var entityName = "entityNameFoo";
        
        expect(entityService.existsByEntityName(entityName)).toEqual(false);
    });
    
    it('should exist Entity by tableName', function() {
        var tableName1 = "tableName1";
        var tableName2 = "tablename1";
        var tableName3 = "TableName1";
        var tableName4 = "Tablename1";
        
        expect(entityService.existsByTableName(tableName1)).toEqual(true);
        expect(entityService.existsByTableName(tableName2)).toEqual(true);
        expect(entityService.existsByTableName(tableName3)).toEqual(true);
        expect(entityService.existsByTableName(tableName4)).toEqual(true);
    });
    
    it('should not exist Entity by tableName', function() {
        var tableName = "tableNameFoo";
        
        expect(entityService.existsByTableName(tableName)).toEqual(false);
    });
    
    it('should create an Entity and return it', function() {
        var id = 5;
        var entity = entityService.create(id, "entityName5", "tableName5", "namespace");
        
        expect(entity._id).toEqual(id);
    });
    
    it('should create an Entity, add to collection and return it', function() {
        var id = 5;
        var name = "entityName5";
        var tableName = "tableName5";
        var namespace = "namespace";
        
        entityService.add(entityService.create(id, name, tableName, namespace));
        
        var entity = entityService.findById(id);
        
        expect(entity._id).toEqual(id);
    });
    
    it('should update an Entity and return it updated', function() {
        var id = 1;
        var fooName = "entityNameFoo";
        var entity = entityService.findById(id);
        
        entity.entityName = fooName;
        entityService.update(entity);
        
        entity = entityService.findById(id);
        
        expect(entity.entityName).toEqual(fooName);
    });
    
    it('should remove an Entity', function() {
        var total = entityService.findAll().length;
        var id = 1;
        
        entityService.remove(id);
        
        expect(entityService.findAll().length).toEqual(total - 1);
    });
    
    it('should clear the collection', function() {
        entityService.clear();
        
        expect(entityService.findAll().length).toEqual(0);
    });
    
});