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
        function createEntity(id, entityName, tableName, namespace) {
            return new Entity({
                id: id,
                entityName: entityName,
                tableName: tableName,
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
                return (entity.id != id && entity.entityName == name);
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
                return (entity.id != id && entity.tableName == name);
            }) < 0);
        };
        
        /**
         * Get an entity by id
         * @param integer id
         * @return Entity|null
         */
        function findById(id) {
            return _.find(entities, { 'id': id });
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
            var i = _.findIndex(entities, { 'id': entity.id });
            if (i > -1) {
                entities[i] = entity;
            }
        }
        
        /**
         * Remove an entity
         * @param string id
         */
        function removeEntity(id) {
            _.remove(entities, { 'id': id });
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