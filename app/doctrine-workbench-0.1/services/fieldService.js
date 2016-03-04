'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('FieldService', function () {
        
        var fields = new Array();

        /**
         * Create new field
         * @param object data
         * @returns Field
         */
        function createNewField(data) {
            return new Field(data);
        }

        /**
         * Create new pk field
         * @param string id
         * @param string entityName
         * @param string tableName
         * @returns Field
         */
        function createEmptyPkField(id, name, tableName) {
            return createNewField({
                id: id,
                name: name,
                tableName: tableName,
                length: 0, 
                pk: true, 
                nn: false, 
                type: 'integer',
                default: null,
                strategy: 'AUTO'
            });
        }
        
        /**
         * Create new field
         * @param string id
         * @param string entityName
         * @param string tableName
         * @returns Field
         */
        function createEmptyField(id, name, tableName) {
            return createNewField({
                id: id,
                name: name,
                tableName: tableName,
                length: 255, 
                pk: false, 
                nn: false, 
                default: null,
                type: 'string'
            });
        }
        
        /**
         * Create new relation field
         * @param string id
         * @param string entityName
         * @param string tableName
         * @returns Field
         */
        function createRelationField(id, name, relationId) {
            var relations = new Array();
            relations.push(relationId);
            
            return createNewField({
                id: id,
                name: name,
                tableName: name,
                length: 0, 
                pk: false, 
                nn: false, 
                type: '',
                default: null,
                relations: relations
            });
        }

        /**
         * Load fields in collection
         * @param array newFields
         * @returns fieldService
         */
        function loadFields(newFields) {
            fields = newFields;
            
            return this;
        }

        /**
         * Return all fields
         * @returns Array
         */
        function getFields() {
            return fields;
        }
        
        /**
         * Check if exists a field by its name
         * @param string name
         * @param integer id  actual id if exists
         * @returns boolean 
         */
        function existByFieldName(name, id) {
            return !(_.findIndex(fields, function(field) {
                return (field.id != id && field.name == name);
            }) < 0);
        };
    
        /**
         * Check if exists a field by its table name
         * @param string name
         * @param integer id  actual id if exists
         * @returns boolean 
         */
        function existByTableName(name, id) {
            return !(_.findIndex(fields, function(field){ 
                return (field.id != id && field.tableName == name);
            }) < 0);
        };
        
        /**
         * Get a field by id
         * @param integer id
         * @return Field|null
         */
        function findById(id) {
            return _.find(fields, { 'id': id });
        };
        
        /**
         * Add new field to collection
         * @param Field field
         */
        function addField(field) {
            fields.push(field);
        }
        
        /**
         * Return first pk field, if not first field in collection.
         * No fields in collection return null
         * @returns Field|null
         */
        function findDefaultField() {
            if (0 == fields.length) {
                return null;
            }
            
            var field = _.find(fields, { 'pk': true });
            if (field == null) {
                field = fields[0];
            }

            return field;
        }
        
        /**
         * Update a field
         * @param Field field
         */
        function updateField(field) {
            var i = _.findIndex(fields, { 'id': field.id });
            if (i > -1) {
                fields[i] = field;
            }
        }
        
        /**
         * Remove a field
         * @param string id
         */
        function removeField(id) {
            _.remove(fields, { 'id': id });
        }
 
        return {
            findAll: getFields,
            findById: findById,
            findDefaultField: findDefaultField,
            existsByFieldName: existByFieldName,
            existsByTableName: existByTableName,
            add: addField,
            update: updateField,
            remove: removeField,
            createEmptyPkField: createEmptyPkField,
            createEmptyField: createEmptyField,
            createRelationField: createRelationField,
            load: loadFields
        };
    });
 
})();