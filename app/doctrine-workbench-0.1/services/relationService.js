'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('RelationService', ['FieldService', 'UtilsService',
        function (FieldService, UtilsService) {
        
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
                    return new ManyToOneRelation(relation);
                case 4:
                   return new OneToManyRelation(relation);
                case 8:
                    return new ManyToManyRelation(relation);
                default:
                    return null;
            }
        };

        function createRelation(sourceId, targetId, type, cascade, source, target) { 
            // fix many to one type
            var sourceType = (2 == type) ? 4 : type;
            
            var camelSourceEntityName = UtilsService.toCamelCase(source.name),
                camelTargetEntityName = UtilsService.toCamelCase(target.name),
                sourceRelationOptions = {
                    _id: sourceId,
                    type: sourceType,
                    fieldName: camelTargetEntityName,
                    targetEntity: target.name,
                    mappedBy: camelSourceEntityName,
                    cascade: cascade
            },
                targetRelationOptions = {
                    _id: targetId,
                    type: type,
                    fieldName: camelSourceEntityName,
                    targetEntity: source.name,
                    inversedBy: camelTargetEntityName,
                    cascade: cascade
            };

            if (1 === type || 2 === type) {
                FieldService.load(source.fieldMappings);
                targetRelationOptions['joinColumns'] = [
                    {
                        'name': UtilsService.toSnakeCase(FieldService.findDefaultField().columnName + '_' + source.name),
                        'referencedColumnName': FieldService.findDefaultField().columnName
                    }
                ];
            }

            if (8 === type) {
                FieldService.load(source.fieldMappings);
                var sourceDefaultFieldName = FieldService.findDefaultField().columnName;
                FieldService.load(target.fieldMappings);
                var targetDefaultFieldName = FieldService.findDefaultField().columnName;
                sourceRelationOptions['joinTable'] = {
                    'name': UtilsService.toSnakeCase(source.name + '_' + target.name),
                    'joinColumns': [
                        {
                            'name': sourceDefaultFieldName,
                            'referencedColumnName': targetDefaultFieldName
                        }
                    ],
                    'inverseJoinColumns': [
                        {
                            'name': targetDefaultFieldName,
                            'referencedColumnName': sourceDefaultFieldName
                        }
                    ]
                }
            }
            
            return {
                'sourceRelation': getRelationByType(sourceRelationOptions),
                'targetRelation': getRelationByType(targetRelationOptions)
            };
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
            return _.find(relations, { '_id': id });
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
                    if (relations[i]._id == ids[j]) {
                        results.push(relations[i]);
                    }
                }
            }

            return results;
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
            var i = _.findIndex(relations, { '_id': relation._id });
            if (i > -1) {
                relations[i] = relation;
            }
        }
        
        /**
         * Remove a relation
         * @param string id
         */
        function removeRelation(id) {
            _.remove(relations, { '_id': id });
        }
        
        function clear() {
            relations = new Array();
        }
 
        return {
            findAll: getRelations,
            findById: findById,
            findRelationsById: findRelationsById,
            add: addRelation,
            update: updateRelation,
            remove: removeRelation,
            create: createRelation,
            clear: clear
        };
    }]);
 
})();