'use strict';

/**
 * Load schema controller
 */
DoctrineWorkbenchController.controller('ModalLoadSchemaController', [ '$scope', '$modalInstance', '$http', 'UtilsService', '$translate',
    function($scope, $modalInstance, $http, UtilsService, $translate) {

        $scope.showTable = false;
        $scope.loading = false;

        /**
         * Lists schemas
         */
        $scope.listSchemas = function() {
            var request = $http({
                method: "post",
                url: location.origin + location.pathname + "list-schemas"
            });
            request.success(
                function(html) {
                    if (html.success) {
                        $scope.schemas = html.data;
                        $scope.showTable = true;
                    } else {
                        $modalInstance.close(html);
                    }
                }
            );
        };

        // execute on start
        $scope.listSchemas();

        /**
         * Load a schema
         * @param integer id
         */
        $scope.loadSchema = function(id) {
            $scope.loading = true;
            var request = $http({
                method: "post",
                url: location.origin + location.pathname + "get-schema",
                data: {
                    id: id
                }
            });
            request.success(
                function(html) {
                    $modalInstance.close(html);
                }
            );
        };

        /**
         * Remove a schema
         */
        $scope.removeSchema = function(id) {
            UtilsService.bsconfirm($translate.instant('label.are_sure'), function(result) {
                $scope.loading = true;
                var request = $http({
                    method: "delete",
                    url: location.origin + location.pathname + "delete",
                    data: {
                        id: id
                    }
                });

                request.success(
                    function(html) {
                        if (html.success) {
                            _.remove($scope.schemas, { 'id': id });
                            UtilsService.bsalert(html.data.message);
                            $scope.loading = false;
                        } else {
                            $modalInstance.close(html);
                        }
                    }
                );
            });
        };

        $scope.close = function(data) {
            $modalInstance.close(data);
        };
    }
]);