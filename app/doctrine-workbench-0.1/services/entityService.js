'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('EntityService', function () {
        var entities = new Array();
        
        /**
         * Create new entity
         * @param string entityName
         * @param string tableName
         * @param string namespace
         * @returns Entity
         */
        function createEntity(id, name, tableName, namespace) {
            return new Entity({
                _id: id,
                name: name,
                tableName: {
                    'name': tableName
                },
                namespace: namespace
            });
        }

        /**
         * Return all entities
         * @returns Array
         */
        function getEntities() {
            return entities;
        }
        
        /**
         * Check if exists an entity by its name
         * @param string name
         * @param integer id  actual id if exists
         * @returns boolean 
         */
        function existByEntityName(name, id) {
            return !(_.findIndex(entities, function(entity) {
                return (entity._id != id && entity.name.toLowerCase() == name.toLowerCase());
            }) < 0);
        };
    
        /**
         * Check if exists an entity by its table name
         * @param string name
         * @param integer id  actual id if exists
         * @returns boolean 
         */
        function existByTableName(name, id) {
            return !(_.findIndex(entities, function(entity){ 
                return (entity._id != id && entity.tableName.name.toLowerCase() == name.toLowerCase());
            }) < 0);
        };
        
        /**
         * Get an entity by id
         * @param integer id
         * @return Entity|null
         */
        function findById(id) {
            return _.find(entities, { '_id': id });
        };
        
        /**
         * Add new entity to collection
         * @param Entity entity
         */
        function addEntity(entity) {
            entities.push(entity);
        }
        
        /**
         * Update an entity
         * @param Entity entity
         */
        function updateEntity(entity) {
            var i = _.findIndex(entities, { '_id': entity.id });
            if (i > -1) {
                entities[i] = entity;
            }
        }
        
        /**
         * Remove an entity
         * @param string id
         */
        function removeEntity(id) {
            _.remove(entities, { '_id': id });
        }
        
        /**
         * Clear the collection
         */
        function clear() {
            entities = new Array();
        }
 
        return {
            findAll: getEntities,
            findById: findById,
            existsByEntityName: existByEntityName,
            existsByTableName: existByTableName,
            add: addEntity,
            update: updateEntity,
            remove: removeEntity,
            create: createEntity,
            clear: clear
        };
    });

})();