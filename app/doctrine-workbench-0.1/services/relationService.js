'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('RelationService', function () {
        
        var relations = new Array();

        /**
         * Create new relation by type
         * @param object relation 
         * @return null|Relation
         */
        var getRelationByType = function(relation) {
            switch (relation.type) {
                case 1:
                    return new OneToOneRelation(relation);
                case 2:
                   return new OneToManyRelation(relation);
                case 3:
                    return new ManyToManyRelation(relation);
                default:
                    return null;
            }
        };

        function createRelation(id, type, sourceEntityId, targetEntityId, sourceField, targetField, relationOptions) {
            
            var relationBase = {
                connectionId: id,
                type: type,
                sourceEntityId: sourceEntityId, 
                targetEntityId: targetEntityId,
                sourceFieldId: sourceField.id,
                targetFieldId: targetField.id,
                sourceField: sourceField,
                targetField: targetField
            };
            
            var relation = _.extend({}, relationBase, relationOptions);
            
            return getRelationByType(relation);
        }

        /**
         * Return all relations
         * @returns Array
         */
        function getRelations() {
            return relations;
        }
        
        /**
         * Get a relation by id
         * @param integer id
         * @return Relation|null
         */
        function findById(id) {
            return _.find(relations, { 'connectionId': id });
        };
        
        /**
         * Get relations by id
         * @param Array ids
         * @return Array
         */
        function findRelationsById(ids) {
            var results = new Array();

            for (var i = 0, len = relations.length; i < len; i++) {
                for (var j = 0, _len = ids.length; j < _len; j++) {
                    if (relations[i].connectionId == ids[j]) {
                        results.push(relations[i]);
                    }
                }
            }

            return results;
        }
        
        /**
         * Check if exists a relation between source and target
         * @param string sourceId
         * @param string targetId
         * @returns Boolean
         */
        function existsRelation(sourceId, targetId) {
            return !(_.findIndex(relations, { 'sourceEntityId': sourceId, 'targetEntityId': targetId }) < 0);
        }
        
        /**
         * Add new relation to collection
         * @param Relation relation
         */
        function addRelation(relation) {
            relations.push(relation);
        }
        
        /**
         * Update a relation
         * @param Relation relation
         */
        function updateRelation(relation) {
            var i = _.findIndex(relations, { 'connectionId': relation.connectionId });
            if (i > -1) {
                relations[i] = relation;
            }
        }
        
        /**
         * Remove a relation
         * @param string id
         */
        function removeRelation(id) {
            _.remove(relations, { 'connectionId': id });
        }
        
        function clear() {
            relations = new Array();
        }
 
        return {
            findAll: getRelations,
            findById: findById,
            findRelationsById: findRelationsById,
            existsRelation: existsRelation, 
            add: addRelation,
            update: updateRelation,
            remove: removeRelation,
            create: createRelation,
            clear: clear
        };
    });
 
})();