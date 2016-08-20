'use strict';

/**
 * Edit entity fields controller
 */
DoctrineWorkbenchController.controller('ModalEditFieldsInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'FieldService', 'FieldOptionsFactory', 'UtilsService',
    function($scope, $modalInstance, data, FieldService, FieldOptionsFactory, UtilsService) {
    
        FieldService.load(data.fieldMappings);
        $scope.title = data.title;
        $scope.types = FieldOptionsFactory.getFieldTypes();
        $scope.fieldMappings = FieldService.findAll();  
        $scope.strategies = FieldOptionsFactory.getStrategies();
        $scope.form = {};
        
        $scope.updateTableName = function(field) {
            var newValue = field.fieldName;
            var oldValue = field.columnName;
            
            if (undefined === newValue) {
                field.fieldName = undefined;
            } else if (UtilsService.toSnakeCase(newValue) !== oldValue) {
                field.columnName = UtilsService.toSnakeCase(newValue);
            }
        };

        /**
         * Check if field is disabled
         * @param string name
         * @return boolean 
         */
        $scope.isFieldDisabled = function(fieldType, key) {
            var result = true;

            if (undefined !== fieldType) {
                var type = _.find($scope.types, {id: fieldType});

                result = !(type[key]);
            }

            return result;
        };

        /**
         * Check if length is required
         * @param string fieldType
         * @return boolean 
         */
        $scope.isLengthRequired = function(fieldType) {
            var result = false;

            if (undefined !== fieldType) {
                var type = _.find($scope.types, {id: fieldType});

                result = !!(type.length);
            }

            return result;
        }

        /**
         * Check if field exists by name
         * @param string name
         * @return boolean 
         */
        $scope.existFieldName = function(name, id) {
            return FieldService.existsByFieldName(name, id);
        };

        /**
         * Add new field to collection
         */
        $scope.addField = function() {
            // if is first field set a primary key
            var f = (FieldService.findAll().length == 0) 
                ? FieldService.createEmptyPkField(UtilsService.getUUID(), 'id', 'id') 
                : FieldService.createEmptyField(UtilsService.getUUID(), '', '') ;

            FieldService.add(f);
        };

        $scope.removeField = function(id) {
            FieldService.remove(id);
        };

        $scope.ok = function(form) {
            if (!form.$invalid) {
                $modalInstance.close({
                    identifier: FieldService.getIdentifier(),
                    generatorType: FieldService.getGeneratorType(),
                    fieldMappings: FieldService.findAll(),
                    fieldNames: FieldService.getFieldNames(),
                    columnNames: FieldService.getColumnNames()
                });
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);