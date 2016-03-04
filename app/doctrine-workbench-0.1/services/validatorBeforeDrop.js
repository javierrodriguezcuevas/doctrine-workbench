'use strict';
 
(function () {
 
    DoctrineWorkbenchApp.service('ValidatorBeforeDrop', ['EntityService', 'RelationService', 'UtilsService', '$translate',
        function (EntityService, RelationService, UtilsService, $translate) {
        
        /**
         * 
         * @param {type} info
         * @returns {Boolean}
         */
        function validate(sourceId, targetId) {

            var result  = true;

            // is same item
            if (sourceId == targetId) {
                UtilsService.bsalert($translate.instant('error.relation.reflexive'));
                result = false;
            }
            
            // exist relation between source and target
            if (RelationService.existsRelation(sourceId, targetId)) {
                UtilsService.bsalert($translate.instant('error.relation.no_fields'));
                result = false;
            }

            // no fields in target
            var target = EntityService.findById(targetId);
            if (0 == target.fields.length) {
                UtilsService.bsalert($translate.instant('error.relation.no_fields'));
                result = false;
            }
            
            return result;
        };
 
        return {
            validate: validate
        };
        
    }]);
 
})();