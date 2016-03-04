'use strict';

/**
 * New and edit entity controller
 */
DoctrineWorkbenchController.controller('ModalNewEditEntityInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'EntityService', 'NamespaceCacheService',
    function($scope, $modalInstance, data, EntityService, NamespaceCacheService) {

        $scope.isNew = data.isNew;
        $scope.entity = data.entity;
        $scope.namespaces = NamespaceCacheService.findAll();

        $scope.form = {};

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