'use strict';

/**
 * Edit entity fields controller
 */
DoctrineWorkbenchController.controller('ModalEditFieldsInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'FieldService', 'FieldOptionsFactory', 'UtilsService',
    function($scope, $modalInstance, data, FieldService, FieldOptionsFactory, UtilsService) {
    
        FieldService.load(data.fields);
        $scope.title = data.title;
        $scope.types = FieldOptionsFactory.getFieldTypes();
        $scope.fields = FieldService.findAll();  
        $scope.strategies = FieldOptionsFactory.getStrategies();
        $scope.form = {};
        
        $scope.updateTableName = function(field) {
            var newValue = field.name;
            var oldValue = field.tableName;
            
            if (undefined === newValue ) {
                field.name = undefined;
            } else if ( UtilsService.toSnakeCase(newValue) !== oldValue ) {
                field.tableName = UtilsService.toSnakeCase(newValue);
            }
        };

        /**
         * Check if field is disabled
         * @param string name
         * @return boolean 
         */
        $scope.isFieldDisabled = function(fieldType, key) {
            var result = true;

            if ("" !== fieldType) {
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

            if ("" !== fieldType) {
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
            FieldService.existsByFieldName(name, id);
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
                $modalInstance.close(FieldService.findAll());
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);