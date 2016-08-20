'use strict';

/**
 * New and edit entity controller
 */
DoctrineWorkbenchController.controller('ModalNewEditEntityInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'EntityService', 'UtilsService', 'NamespaceCacheService',
    function($scope, $modalInstance, data, EntityService, UtilsService, NamespaceCacheService) {

        $scope.isNew = data.isNew;
        $scope.entity = data.entity;
        $scope.namespaces = NamespaceCacheService.findAll();
        $scope.form = {};
        
        if ($scope.isNew && $scope.namespaces.length > 0) {
            $scope.entity.namespace = $scope.namespaces[$scope.namespaces.length - 1];
        }
        
        $scope.updateTableName = function() {
            var newValue = $scope.entity.name;
            var oldValue = $scope.entity.tableName;
            
            if (undefined === newValue) {
                $scope.entity.tableName = {
                    'name': ''
                };
            } else if ( UtilsService.toSnakeCase(newValue) !== oldValue ) {
                $scope.entity.tableName.name = UtilsService.toSnakeCase(newValue);
            }
        };

        /**
         * Check if entity exists by name
         * @param string name
         * @return boolean 
         */
        $scope.existByEntityName = function(name, id) {
            return EntityService.existsByEntityName(name, id);
        };

        /**
         * Check if entity exists by table name
         * @param string name
         * @return boolean 
         */
        $scope.existByTableName = function(name, id) {
            return EntityService.existsByTableName(name, id);
        };

        $scope.ok = function(formEntity) {
            if (formEntity.$valid) {
                NamespaceCacheService.add($scope.entity.namespace);
                $modalInstance.close($scope.entity);
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);