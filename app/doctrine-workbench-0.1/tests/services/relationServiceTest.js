"use strict";

describe('RelationServiceTest', function() {
    var relationService;
    var entities;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_RelationService_) {
        relationService = _RelationService_;
        
        entities = [
            new Entity({
                _id: 'idcategory',
                _x: 526,
                _y: 23,
                name: 'Category',
                tableName: 'category',
                namespace: 'AppBundle\Entity',
                fieldNames: {'id': 'id', 'name': 'name'},
                columnNames: {'id': 'id', 'name': 'name'},
                generatorType: 'AUTO',
                identifier: ['id'],
                fieldMappings: [
                    new Field({
                        _id: 'fqwerty1',
                        fieldName: 'id',
                        columnName: 'id',
                        length: 0, 
                        id: true, 
                        nullable: false, 
                        type: 'integer',
                        default: null,
                        strategy: 'AUTO'
                    }),
                    new Field({
                        _id: 'fqwerty2',
                        fieldName: 'name',
                        columnName: 'name',
                        length: 255, 
                        id: false, 
                        nullable: false, 
                        type: 'string',
                        default: null,
                        strategy: 'NONE'
                    })
                ]
            }),
            new Entity({
                _id: 'idcategorycolor',
                _x: 320,
                _y: 23,
                name: 'CategoryColor',
                tableName: 'category_color',
                namespace: 'AppBundle\Entity',
                fieldNames: {'id': 'id', 'color': 'color'},
                columnNames: {'id': 'id', 'color': 'color'},
                generatorType: 'AUTO',
                identifier: ['id'],
                fieldMappings: [
                    new Field({
                        _id: 'fasdfgh1',
                        fieldName: 'id',
                        columnName: 'id',
                        length: 0, 
                        id: true, 
                        nullable: false, 
                        type: 'integer',
                        default: null,
                        strategy: 'AUTO'
                    }),
                    new Field({
                        _id: 'fasdfgh2',
                        fieldName: 'color',
                        columnName: 'color',
                        length: 255, 
                        id: false, 
                        nullable: false, 
                        type: 'string',
                        default: null,
                        strategy: 'NONE'
                    })
                ]
            }),
            new Entity({
                _id: 'idpost',
                _x: 738,
                _y: 23,
                name: 'Post',
                tableName: 'post',
                namespace: 'AppBundle\Entity',
                fieldNames: {'id': 'id', 'name': 'name'},
                columnNames: {'id': 'id', 'name': 'name'},
                generatorType: 'AUTO',
                identifier: ['id'],
                fieldMappings: [
                    new Field({
                        _id: 'fzxcvbn1',
                        fieldName: 'id',
                        columnName: 'id',
                        length: 0, 
                        id: true, 
                        nullable: false, 
                        type: 'integer',
                        default: null,
                        strategy: 'AUTO'
                    }),
                    new Field({
                        _id: 'fzxcvbn2',
                        fieldName: 'name',
                        columnName: 'name',
                        length: 255, 
                        id: false, 
                        nullable: false, 
                        type: 'string',
                        default: null,
                        strategy: 'NONE'
                    })
                ]
            }),
            new Entity({
                _id: 'idtag',
                _x: 945,
                _y: 23,
                name: 'Tag',
                tableName: 'tag',
                namespace: 'AppBundle\Entity',
                fieldNames: {'id': 'id', 'name': 'name'},
                columnNames: {'id': 'id', 'name': 'name'},
                generatorType: 'AUTO',
                identifier: ['id'],
                fieldMappings: [
                    new Field({
                        _id: 'fpoiuyt1',
                        fieldName: 'id',
                        columnName: 'id',
                        length: 0, 
                        id: true, 
                        nullable: false, 
                        type: 'integer',
                        default: null,
                        strategy: 'AUTO'
                    }),
                    new Field({
                        _id: 'fpoiuyt2',
                        fieldName: 'name',
                        columnName: 'name',
                        length: 255, 
                        id: false, 
                        nullable: false, 
                        type: 'string',
                        default: null,
                        strategy: 'NONE'
                    })
                ]
            })
        ];
        
        var relationOneToOne = relationService.create('idcategory', 'idcategorycolor', 1, [], entities[0], entities[1]);
        var relationOneToMany = relationService.create('idcategory2', 'idpost', 2, [], entities[0], entities[2]);
        var relationManyToMany = relationService.create('idpost2', 'idtag', 3, [], entities[2], entities[3]);
        
        relationService.add(relationOneToOne.sourceRelation);
        relationService.add(relationOneToOne.targetRelation);
        relationService.add(relationOneToMany.sourceRelation);
        relationService.add(relationOneToMany.targetRelation);
        relationService.add(relationManyToMany.sourceRelation);
        relationService.add(relationManyToMany.targetRelation);
    }));
    
    it('should return all', function() {
        var fields = relationService.findAll();
        expect(fields.length).toEqual(6);
    });
    
    it('should return Relation with _id idcategory', function() {
        var id = 'idcategory';
        var relation = relationService.findById(id);
        expect(relation._id).toEqual(id);
    });
    
    it('should return Relations with _id idcategory, idcategorycolor and idpost', function() {
        var ids = ['idcategory', 'idcategorycolor', 'idpost'];
        var relations = relationService.findRelationsById(ids);
        expect(relations.length).toEqual(3);
    });
    
    it('should not create a Relation ', function() {
        var type = 7;
        var sourceId = 5;
        var targetId = 6;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        expect(relations.sourceRelation).toEqual(null);
        expect(relations.targetRelation).toEqual(null);
    });
    
    it('should create a OneToOne Relation and return it', function() {
        var type = 1;
        var sourceId = 5;
        var targetId = 6;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        expect(relations.sourceRelation._id).toEqual(sourceId);
        expect(relations.targetRelation._id).toEqual(targetId);
    });
    
    it('should create an OneToMany Relation and return it', function() {
        var type = 2;
        var sourceId = 5;
        var targetId = 6;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        expect(relations.sourceRelation._id).toEqual(sourceId);
        expect(relations.targetRelation._id).toEqual(targetId);
    });
    
    it('should create an ManyToMany Relation and return it', function() {
        var type = 3;
        var sourceId = 5;
        var targetId = 6;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        expect(relations.sourceRelation._id).toEqual(sourceId);
        expect(relations.targetRelation._id).toEqual(targetId);
    });
    
    it('should create a Relation, add to collection and return it', function() {
        var type = 3;
        var sourceId = 5;
        var targetId = 6;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        relationService.add(relations.sourceRelation);
        relationService.add(relations.targetRelation);
        
        expect(relations.sourceRelation._id).toEqual(sourceId);
        expect(relations.targetRelation._id).toEqual(targetId);
    });
    
    it('should update a Relation and return it updated', function() {
        var type = 3;
        var sourceId = 5;
        var targetId = 6;
        var newSourceId = 7;
        var newTargetId = 7;
        var cascade = [];
        var source = entities[0];
        var target = entities[3];
        var relations = relationService.create(sourceId, targetId, type, cascade, source, target);
        relationService.add(relations.sourceRelation);
        relationService.add(relations.targetRelation);
        
        expect(relations.sourceRelation._id).toEqual(sourceId);
        expect(relations.targetRelation._id).toEqual(targetId);
        
        relations.sourceRelation._id = newSourceId;
        relations.targetRelation._id = newTargetId;
        relationService.update(relations.sourceRelation);
        relationService.update(relations.targetRelation);
        
        expect(relations.sourceRelation._id).toEqual(newSourceId);
        expect(relations.targetRelation._id).toEqual(newTargetId);
    });
    
    it('should remove a Relation', function() {
        expect(relationService.findAll().length).toEqual(6);
        var id = 'idcategory';
        relationService.remove(id);
        expect(relationService.findAll().length).toEqual(5);
    });
    
    it('should clear the collection', function() {
        relationService.clear();
        expect(relationService.findAll().length).toEqual(0);
    });
    
});