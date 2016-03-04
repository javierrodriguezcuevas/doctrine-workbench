"use strict";

describe('EntityServiceTest', function() {
    var entityService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_EntityService_) {
        entityService = _EntityService_;
        
        for (var i = 1; i < 4; i++) {
            entityService.add(entityService.create(i, "entityName" + i, "tableName" + i, "namespace"));
        }        
    }));

    it('should return all', function() {
        var entities = entityService.findAll();
        expect(entities.length).toEqual(3);
    });
    
    it('should return Entity with id 1', function() {
        var id = 1;
        var entity = entityService.findById(id);
        expect(entity.id).toEqual(id);
    });
    
    it('should exist Entity by entityName', function() {
        var entityName = "entityName1";
        expect(entityService.existsByEntityName(entityName)).toEqual(true);
    });
    
    it('should not exist Entity by entityName', function() {
        var entityName = "entityNameFoo";
        expect(entityService.existsByEntityName(entityName)).toEqual(false);
    });
    
    it('should exist Entity by tableName', function() {
        var tableName = "tableName1";
        expect(entityService.existsByTableName(tableName)).toEqual(true);
    });
    
    it('should not exist Entity by tableName', function() {
        var tableName = "tableNameFoo";
        expect(entityService.existsByTableName(tableName)).toEqual(false);
    });
    
    it('should create an Entity and return it', function() {
        var id = 5;
        var entity = entityService.create(id, "entityName5", "tableName5", "namespace");
        expect(entity.id).toEqual(id);
    });
    
    it('should create an Entity, add to collection and return it', function() {
        var id = 5;
        entityService.add(entityService.create(id, "entityName5", "tableName5", "namespace"));
        var entity = entityService.findById(id);
        expect(entity.id).toEqual(id);
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
        expect(entityService.findAll().length).toEqual(3);
        var id = 1;
        entityService.remove(id);
        expect(entityService.findAll().length).toEqual(2);
    });
    
    it('should clear the collection', function() {
        entityService.clear();
        expect(entityService.findAll().length).toEqual(0);
    });
    
});