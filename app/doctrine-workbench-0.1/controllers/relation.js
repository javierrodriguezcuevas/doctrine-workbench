'use strict';

/**
 * Edit relation controller
 */
DoctrineWorkbenchController.controller('ModalNewEditRelationInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'EntityService', 'RelationOptionsFactory', '$translate',
    function($scope, $modalInstance, data, EntityService, RelationOptionsFactory, $translate) {
        
        $scope.isNew = data.isNew;
        $scope.type = data.type;
        $scope.sourceEntityName = data.targetRelation.targetEntity;
        $scope.targetEntityName = data.sourceRelation.targetEntity;
        $scope.sourceRelation = data.sourceRelation;
        $scope.targetRelation = data.targetRelation;
        $scope.fieldsTarget = data.sourceFields;
        $scope.fieldsSource = data.targetFields;
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
                $modalInstance.close({
                    'sourceRelation': $scope.sourceRelation,
                    'targetRelation': $scope.targetRelation
                });
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);