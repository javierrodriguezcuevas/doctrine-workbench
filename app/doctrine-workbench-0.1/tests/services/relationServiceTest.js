"use strict";

describe('RelationServiceTest', function() {
    var relationService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_RelationService_) {
        relationService = _RelationService_;
        
        for (var i = 1; i < 4; i++) {
            relationService.add(relationService.create(i, 1, "sourceId" + i, "targetId" + i, 'sourceField1', 'targetField1', {}));
        }
    }));
    
    it('should return all', function() {
        var fields = relationService.findAll();
        expect(fields.length).toEqual(3);
    });
    
    it('should return Relation with connectionId 1', function() {
        var id = 1;
        var relation = relationService.findById(id);
        expect(relation.connectionId).toEqual(id);
    });
    
    it('should return Relations with connectionId 1, 2 and 3', function() {
        var ids = [1, 2, 3];
        var relations = relationService.findRelationsById(ids);
        expect(relations.length).toEqual(3);
    });
    
    it('should exist Relation between source an target', function() {
        var source = "sourceId1";
        var target = "targetId1";
        expect(relationService.existsRelation(source, target)).toEqual(true);
    });
    
    it('should not exist Relation between source an target', function() {
        var source = "sourceId1";
        var target = "targetIdFoo";
        expect(relationService.existsRelation(source, target)).toEqual(false);
    });
    
    it('should not create a Relation ', function() {
        var id = 5;
        var relation = relationService.create(id, 4, "sourceId", "targetId", 'sourceField1', 'targetField1', {});
        expect(relation).toEqual(null);
    });
    
    it('should create a OneToOne Relation and return it', function() {
        var id = 5;
        var relation = relationService.create(id, 1, "sourceId", "targetId", 'sourceField1', 'targetField1', {});
        expect(relation.connectionId).toEqual(id);
    });
    
    it('should create an OneToMany Relation and return it', function() {
        var id = 5;
        var relation = relationService.create(id, 2, "sourceId", "targetId", 'sourceField1', 'targetField1', {});
        expect(relation.connectionId).toEqual(id);
    });
    
    it('should create an ManyToMany Relation and return it', function() {
        var id = 5;
        var relation = relationService.create(id, 3, "sourceId", "targetId", 'sourceField1', 'targetField1', {});
        expect(relation.connectionId).toEqual(id);
    });
    
    it('should create a Relation, add to collection and return it', function() {
        var id = 5;
        relationService.add(relationService.create(id, 1, "sourceId", "targetId", 'sourceField1', 'targetField1', {}));
        var relation = relationService.findById(id);
        expect(relation.connectionId).toEqual(id);
    });
    
    it('should update a Relation and return it updated', function() {
        var id = 1;
        var sourceId = "sourceId42";
        var relation = relationService.findById(id);
        relation.sourceEntityId = sourceId;
        relationService.update(relation);
        relation = relationService.findById(id);
        expect(relation.sourceEntityId).toEqual(sourceId);
    });
    
    it('should remove a Relation', function() {
        expect(relationService.findAll().length).toEqual(3);
        var id = 1;
        relationService.remove(id);
        expect(relationService.findAll().length).toEqual(2);
    });
    
    it('should clear the collection', function() {
        relationService.clear();
        expect(relationService.findAll().length).toEqual(0);
    });
    
});