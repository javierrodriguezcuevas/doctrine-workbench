'use strict';

/**
 * Edit relation controller
 */
DoctrineWorkbenchController.controller('ModalNewEditRelationInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'EntityService', 'RelationOptionsFactory', '$translate',
    function($scope, $modalInstance, data, EntityService, RelationOptionsFactory, $translate) {

        var source = EntityService.findById(data.relation.sourceEntityId);
        var target = EntityService.findById(data.relation.targetEntityId);

        $scope.isNew = data.isNew;
        $scope.sourceEntityName = source.entityName;
        $scope.targetEntityName = target.entityName;
        $scope.entities = EntityService.findAll();
        $scope.relation = data.relation;
        $scope.fieldsTarget = EntityService.findById(data.relation.targetEntityId).fields;
        $scope.fieldsSource = EntityService.findById(data.relation.sourceEntityId).fields;
        $scope.cascadeOptions = RelationOptionsFactory.getCascadeOptions();

        $scope.form = {};

        $scope.multiselectSettings = {
            buttonClasses: 'btn btn-default btn-block',
            smartButtonMaxItems: 3,
            smartButtonTextConverter: function(itemText, originalItem) {
                if ($scope.cascadeOptions.length < 4) {
                    return itemText;
                }
            }
        };
        $scope.multiselectTextSettings = {
            buttonDefaultText: $translate.instant('label.cascade_options')
        };

        $scope.ok = function(form) {
            if (form.$valid) {
                $modalInstance.close($scope.relation);
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);