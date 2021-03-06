'use strict';

/**
 * Edit relation controller
 */
DoctrineWorkbenchController.controller('ModalNewEditRelationInstanceCtrl', [ '$scope', '$modalInstance', 'data', 'RelationOptionsFactory', '$translate',
    function($scope, $modalInstance, data, RelationOptionsFactory, $translate) {
        
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
                // fix cascade in sourceRelation
                var fixedCascade = RelationOptionsFactory.getFixedCascadeOptions();
                var cascade = _.map($scope.sourceRelation.cascade, function(value) {
                    return value.id;
                });
                var allCascade = {};
                for (var i = 0, len = fixedCascade.length; i < len; i++) {
                    allCascade[fixedCascade[i]] = (cascade.indexOf(fixedCascade[i]) > -1);
                }
                
                for (var prop in allCascade) {
                    $scope.sourceRelation[prop] = allCascade[prop];
                }
                
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