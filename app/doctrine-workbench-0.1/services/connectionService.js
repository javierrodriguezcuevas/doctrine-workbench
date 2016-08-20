'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.service('ConnectionService', function () {
        
        var connections = new Array();
        
        function getFlatConnections() {
            var result = _.map(connections, function(value) {
                return {
                    relationUuid: value.relationUuid,
                    relationType: value.relationType,
                    workbenchIds: value.workbenchIds
                };
            });
            
            return result;
        }
        
        /**
         * Returns hover cssClass by type
         * @param int relationType
         * @returns string hoverClass
         */
        function getHoverClassByType(relationType) {
            var hoverClass = null;
            
            switch (relationType) {
                case 1: 
                    return 'oneToOneHover';
                break;
                case 2: 
                    return 'oneToManyHover';
                break;
                case 4: 
                    return 'oneToManyHover';
                break;
                case 8: 
                    return 'manyToManyHover';
                break;
            }
            
            return hoverClass;
        }
        
        /**
         * Returns connection type by css class
         * @param string hoverClass
         * @returns integer relationType
         */
        function getTypeByHoverClass(hoverClass) {
            var relationType = null;
            
            switch (hoverClass) {
                case 'oneToOneHover':
                    relationType = 1;
                break;
                case 'oneToManyHover':
                    relationType = 2;
                break;
                case 'oneToManyHover':
                    relationType = 4;
                break;
                case 'manyToManyHover':
                    relationType = 8;
                break;
            }
            
            return relationType;
        };

        /**
         * Get connection options by type
         * @param integer type
         * @returns object
         */
        function getConnectionOptions(type) {
            var overlays = {};
            
            switch (type) {
                case 1:
                    overlays = {
                        hoverClass: 'oneToOneHover',
                        overlays: overlaysOneToOne
                    };
                break;
                case 2:
                    overlays = {
                        hoverClass: 'oneToManyHover',
                        overlays: overlaysOneToMany
                    };
                break;
                case 4:
                    overlays = {
                        hoverClass: 'oneToManyHover',
                        overlays: overlaysOneToMany
                    };
                break;
                case 8:
                    overlays = {
                        hoverClass: 'manyToManyHover',
                        overlays: overlaysManyToMany
                    };
                break;
            }
            
            return _.extend({}, connectorCommonOptions, overlays);
        }

        /**
         * Return all connections
         * @returns Array
         */
        function getConnections() {
            return connections;
        }
        
        /**
         * Get a connection by id
         * @param integer id
         * @return Relation/null
         */
        function findById(id) {
            return _.find(connections, { 'relationUuid': id });
        };
        
        /**
         * Returns connections associated to associationMappings
         * @param array associationMappings
         * @returns array
         */
        function findByAssociationMappings(associationMappings) {
            var mappingsIds = _.map(associationMappings, function(value) {
                return value._id;
            });
            
            return _.intersectionWith(connections, mappingsIds, function(connection, mappingId) {
                return (mappingId == connection.workbenchIds.sourceRelationId || mappingId == connection.workbenchIds.targetRelationId);
            });
        }
        
        /**
         * Check if exists a relation between source and target
         * @param string sourceRelationId
         * @param string targetRelationId
         * @returns Boolean
         */
        function existsRelation(sourceId, targetId) {
            return !(_.findIndex(connections, function(connection) {
                return (sourceId == connection.workbenchIds.sourceId && targetId == connection.workbenchIds.targetId
                    ||  targetId == connection.workbenchIds.sourceId && sourceId == connection.workbenchIds.targetId
                    );
            }) < 0);
        }
        
        /**
         * Add new connection to collection
         * @param Relation relation
         */
        function addConnection(connection) {
            connections.push(connection);
        }
        
        /**
         * Update a connection
         * @param Relation relation
         */
        function updateConnection(connection) {
            var i = _.findIndex(connections, { 'relationUuid': connection.relationUuid });
            if (i > -1) {
                connection[i] = connection;
            }
        }
        
        /**
         * Remove a connection
         * @param string id id del elemento a eliminar
         */
        function removeConnection(id) {
            _.remove(connections, { 'relationUuid': id });
        }
        
        /**
         * Clear the collection
         */
        function clear() {
            connections = new Array();
        }
 
        return {
            findAll: getConnections,
            findById: findById,
            findByAssociationMappings: findByAssociationMappings,
            existsRelation: existsRelation,
            add: addConnection,
            update: updateConnection,
            remove: removeConnection,
            clear: clear,
            getConnectionOptions: getConnectionOptions,
            getTypeByHoverClass: getTypeByHoverClass,
            getHoverClassByType: getHoverClassByType,
            getFlatConnections: getFlatConnections
        };
    });

})();