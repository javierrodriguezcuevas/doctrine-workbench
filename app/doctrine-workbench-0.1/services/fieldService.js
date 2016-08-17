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
         * @param string fieldName
         * @param string columnName
         * @returns Field
         */
        function createEmptyPkField(id, fieldName, columnName) {
            return createNewField({
                _id: id,
                fieldName: fieldName,
                columnName: columnName,
                length: 0, 
                id: true, 
                nullable: false, 
                type: 'integer',
                default: null,
                strategy: 'AUTO'
            });
        }
        
        /**
         * Create new field
         * @param string id
         * @param string fieldName
         * @param string columnName
         * @returns Field
         */
        function createEmptyField(id, fieldName, columnName) {
            return createNewField({
                _id: id,
                fieldName: fieldName,
                columnName: columnName,
                length: 255, 
                id: false, 
                nullable: false, 
                default: null,
                type: 'string'
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
         * Return fieldNames from current fields
         * @returns Array
         */
        function getFieldNames() {
            // columnName => fieldName
            var result = _.map(fields, function(value) {
                var res = {};
                res[value.columnName] = value.fieldName;
                
                return res;
            });
            
            return result;
        }

        /**
         * Return columnNames from current fields
         * @returns Array
         */
        function getColumnNames() {
            // fieldName => columnName
              var result = _.map(fields, function(value) {
                var res = {};
                res[value.fieldName] = value.columnName;
                
                return res;
            });
            
            return result;
        }
        
        /**
         * Check if exists a field by its name
         * @param string name
         * @param integer id  actual id if exists
         * @returns boolean 
         */
        function existByFieldName(name, id) {
            return !(_.findIndex(fields, function(field) {
                return (field._id != id && field.fieldName.toLowerCase() == name.toLowerCase());
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
                return (field._id != id && field.columnName.toLowerCase() == name.toLowerCase());
            }) < 0);
        };
        
        /**
         * Get a field by id
         * @param integer id
         * @return Field|null
         */
        function findById(id) {
            return _.find(fields, { '_id': id });
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
            
            var field = _.find(fields, { 'id': true });
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
            var i = _.findIndex(fields, { '_id': field._id });
            if (i > -1) {
                fields[i] = field;
            }
        }
        
        /**
         * Remove a field
         * @param string id
         */
        function removeField(id) {
            _.remove(fields, { '_id': id });
        }
 
        return {
            findAll: getFields,
            findById: findById,
            findDefaultField: findDefaultField,
            getFieldNames: getFieldNames,
            getColumnNames: getColumnNames,
            existsByFieldName: existByFieldName,
            existsByTableName: existByTableName,
            add: addField,
            update: updateField,
            remove: removeField,
            createEmptyPkField: createEmptyPkField,
            createEmptyField: createEmptyField,
            load: loadFields
        };
    });
 
})();