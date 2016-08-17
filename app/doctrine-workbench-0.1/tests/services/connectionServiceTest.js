"use strict";

describe('ConnectionServiceTest', function() {
    var connectionService;
    
    beforeEach(module('DoctrineWorkbenchApp'));
    beforeEach(inject(function (_ConnectionService_) {
        connectionService = _ConnectionService_;
        
        for (var i = 1; i < 4; i++) {
            connectionService.add({
                'relationUuid': i, 
                'workbenchIds': {
                    sourceId: 'idcategory' + i,
                    targetId: 'idpost' + i
                }
            });
        }        
    }));

    it('should return all', function() {
        var connections = connectionService.findAll();
        
        expect(connections.length).toEqual(3);
    });
    
    it('should return Connection with relationUuid 1', function() {
        var id = 1;
        var connection = connectionService.findById(id);
        expect(connection.relationUuid).toEqual(id);
    });
    
    it('should return relationType 1', function() {
        var relationType = connectionService.getTypeByHoverClass('oneToOneHover');
        expect(relationType).toEqual(1);
    });
    
    it('should return relationType 2', function() {
        var relationType = connectionService.getTypeByHoverClass('oneToManyHover');
        expect(relationType).toEqual(2);
    });
    
    it('should return relationType 3', function() {
        var relationType = connectionService.getTypeByHoverClass('manyToManyHover');
        expect(relationType).toEqual(3);
    });
    
    it('should create a oneToOne connectionOptions and return it', function() {
        var connectionOptions = connectionService.getConnectionOptions(1);
        expect(connectionOptions.hoverClass).toEqual('oneToOneHover');
    });
    
    it('should create a oneToMany connectionOptions and return it', function() {
        var connectionOptions = connectionService.getConnectionOptions(2);
        expect(connectionOptions.hoverClass).toEqual('oneToManyHover');
    });
    
    it('should create a manyToMany connectionOptions and return it', function() {
        var connectionOptions = connectionService.getConnectionOptions(3);
        expect(connectionOptions.hoverClass).toEqual('manyToManyHover');
    });
    
    it('should add a Connection to collection and return it', function() {
        var id = 5;
        connectionService.add({'relationUuid': id});
        var connection = connectionService.findById(id);
        expect(connection.relationUuid).toEqual(id);
    });
    
    it('should update a Connection and return it updated', function() {
        var id = 1;
        var newValue = "newValue";
        var connection = connectionService.findById(id);
        connection.newValue = newValue;
        connectionService.update(connection);
        connection = connectionService.findById(id);
        expect(connection.newValue).toEqual(newValue);
    });
    
    it('should remove a Connection', function() {
        expect(connectionService.findAll().length).toEqual(3);
        var id = 1;
        connectionService.remove(id);
        expect(connectionService.findAll().length).toEqual(2);
    });
    
    it('should clear the collection', function() {
        connectionService.clear();
        expect(connectionService.findAll().length).toEqual(0);
    });
    
    it('should exist Connection between source an target', function() {
        var source = "idcategory1";
        var target = "idpost1";
        expect(connectionService.existsRelation(source, target)).toEqual(true);
    });
    
});