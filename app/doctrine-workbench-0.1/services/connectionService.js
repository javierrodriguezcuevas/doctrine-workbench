'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.service('ConnectionService', function () {
        
        var connections = new Array();
        
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
                case 'manyToManyHover':
                    relationType = 3;
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
                case 3:
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
            return _.find(connections, { 'relationId': id });
        };
        
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
            var i = _.findIndex(connections, { 'relationId': connection.relationId });
            if (i > -1) {
                connection[i] = connection;
            }
        }
        
        /**
         * Remove a connection
         * @param string id id del elemento a eliminar
         */
        function removeConnection(id) {
            _.remove(connections, { 'relationId': id });
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
            add: addConnection,
            update: updateConnection,
            remove: removeConnection,
            clear: clear,
            getConnectionOptions: getConnectionOptions,
            getTypeByHoverClass: getTypeByHoverClass
        };
    });

})();