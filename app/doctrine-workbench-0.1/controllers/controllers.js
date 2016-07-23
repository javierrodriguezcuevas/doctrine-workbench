'use strict';

var DoctrineWorkbenchController = angular.module('DoctrineWorkbenchController', []);

DoctrineWorkbenchController.controller('IndexController', ['$scope', '$http', '$modal', 'ZoomService', 'EntityService', 'FieldService', 'RelationService', 'ConnectionService', 'ValidatorBeforeDrop', 'DraggableWorkbenchService', 'UtilsService', '$translate',
    function($scope, $http, $modal, ZoomService, EntityService, FieldService, RelationService, ConnectionService, ValidatorBeforeDrop, DraggableWorkbenchService, UtilsService, $translate) {

        $scope.entities = EntityService.findAll();
        $scope.connections = ConnectionService.findAll();
        $scope.relations = RelationService.findAll();
        $scope.currentZoom = 1;
        
        /**
         * On page ready event
         */
        $scope.$on('$viewContentLoaded', function() {
            
            DraggableWorkbenchService.start();
            
            jsPlumb.setContainer($("#workbench"));
            
            var zoomStep = 0.02;
            $('#workbench-wrapper').bind('wheel mousewheel', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.originalEvent.wheelDelta / 120 > 0) {
                    if ($scope.currentZoom + zoomStep <= 1.9) {
                        $scope.currentZoom += zoomStep;
                    }
                } else{
                    if ($scope.currentZoom - zoomStep >= 0.1) {
                        $scope.currentZoom -= zoomStep;
                    }
                }

                $scope.updateZoom();
                // need to update scope to update slider
                $scope.$apply();
            });
                
            jsPlumb.bind("ready", function() {
                
                $scope.updateZoom();
                
                // binding beforeDrop event allow validate the relation
                jsPlumb.bind("beforeDrop", function(info) {
                    // console.log("Dropping a connection");
                    var result = true;
                    
                    if (!ValidatorBeforeDrop.validate(
                            info.connection.source.getAttribute('data-identifier'), 
                            info.connection.target.getAttribute('data-identifier'))) {
                        if (null != info.dropEndpoint) {
                            jsPlumb.deleteEndpoint(info.dropEndpoint);
                        }
                        
                        result = false;
                    }
                    
                    return result;
                });
                
                $scope.bindNewConnection(); 
            });
        });
        
        /**
         * Bind events to connection
         * @param jsPlumbConnection connection
         * @param string hoverClass
         */
        $scope.setConnectionEvents = function(connection, hoverClass) {

            // click listener on connection to edit relation
            connection.bind('click', function(info) {
                $scope.editRelation(connection);
            });

            // listener on item close button to delete connection
            var deleteIcon = (connection.getOverlay(hoverClass) != undefined)
                ? connection.getOverlay(hoverClass).canvas // loadSchema
                : connection.canvas.nextSibling; // newRelation

            $(deleteIcon).find('.glyphicon-remove').bind('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                UtilsService.bsconfirm($translate.instant('label.sure_delete_relation'), function() {
                    $scope.deleteConnection(connection);            
                    // need to update scope to update entity fields
                    $scope.$apply();
                });
            });
            
            // set hover class to endpoints
            for (var i = 0, len = connection.endpoints.length; i < len; i++) {
                connection.endpoints[i]._jsPlumb.hoverClass = hoverClass;
            }
            // bind mouseover, mouseout to items
            connection
                .bind('mouseover', function(info) {
                    var source = info.source || info.component.source;
                    var target = info.target || info.component.target;
                    $(target).addClass(hoverClass);
                    $(source).addClass(hoverClass);
                }).bind('mouseout', function(info) {
                    var source = info.source || info.component.source;
                    var target = info.target || info.component.target;
                    $(target).removeClass(hoverClass);
                    $(source).removeClass(hoverClass);
                });
        };
        
        /**
         * Listener on new connection to create a relation
         */
        $scope.bindNewConnection = function() {
            
            jsPlumb.bind("connection", function(info) {
                
                var relationType = ConnectionService.getTypeByHoverClass(info.sourceEndpoint.connectorHoverClass);
                
                if (null !== relationType) {
                    var $source = $(info.connection.source); //.parents('.item:first');
                    var $target = $(info.connection.target);

                    var source = EntityService.findById($source.data('identifier'));
                    var target = EntityService.findById($target.data('identifier'));
                    
                    $scope.newRelation(source, target, info.connection, relationType);
                }
            });
        };
        
        /**
         * Change workbench zoom
         */
        $scope.updateZoom = function() {
            ZoomService.changeZoom($scope.currentZoom);
        };
        
        /**
         * Start a new workbench
         */
        $scope.clearWorkbenchConfirmation = function() {
            if ($scope.entities.length > 0) {
                UtilsService.bsconfirm($translate.instant('label.sure_new_workbench'), function() {
                    $scope.clearWorkbench();
                    $scope.$apply();
                });
            } else {
                $scope.clearWorkbench();
            }
        };
        
        /**
         * Delete an entity
         */
        $scope.removeEntityConfirmation = function(id) {
            UtilsService.bsconfirm($translate.instant('label.sure_delete_entity'), function() {
                jsPlumb.detachAllConnections(id);		
                $scope.removeEntity(id);
                $scope.$apply();
            });
        };
        
        /**
         * Save a schema
         */
        $scope.saveSchema = function() {
            
            UtilsService.bsprompt($translate.instant('label.save_schema_name'), function(value, $input) {
                if (value != null && value != "") {
                    var box = bootbox.dialog({
                        closeButton: false,
                        message: '<img src="' + location.origin + location.pathname + 'dist/img/loading.gif" />'
                    });
                    var request = $http({
                        method: "post",
                        url: location.origin + location.pathname + "save",
                        data: {
                            name: value,
                            zoom: $scope.currentZoom,
                            schema: {
                                entities: $scope.entities,
                                relations: $scope.relations
                            }
                        }
                    });

                    request.success(
                        function(html) {
                            box.modal('hide');
                            if (html.success) {
                                UtilsService.bsalert(html.data.message);
                            } else {
                                UtilsService.bsalert($translate.instant('error.response_server') + '<br/>' + html.message);
                                console.log(html);
                            }
                        }
                    );
                } else {
                    $input.parent().addClass('has-error');
                    if (!$input.next().is('p')) {
                        $('<p class="help-block error">' + $translate.instant('error.required') + '</p>').insertAfter($input);
                    }
                    return false;
                }
            });
        };

        /**
         * Send schema data to server
         */
        $scope.sendSchema = function() {
            var request = $http({
                method: "post",
                url: location.origin + location.pathname + "proccess",
                data: {
                    entities: $scope.entities,
                    relations: $scope.relations
                }
            });

            request.success(
                function(html) {
                    if (html.success) {
                        location.href = html.data.downloadUrl;
                    } else {
                        UtilsService.bsalert($translate.instant('error.response_server') + '<br/>' + html.message);
                        console.log(html);
                    }                    
                }
            );
        };

        /**
         * Show modal listing schemas
         */
        $scope.listSchemas = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modalLoadSchema.html',
                controller: 'ModalLoadSchemaController',
                windowTemplateUrl: 'modalTemplate.html'
            });
            
            modalInstance.result.then(function(data) {
                if (data != undefined) {
                    if (data.success) {
                        UtilsService.bsalert("'" + data.data.name + ' ' + $translate.instant('label.loaded'));
                        $scope.loadSchema($.parseJSON(data.data.schema), data.data.zoom);
                    } else {
                        UtilsService.bsalert(data.message);
                    }
                }
            });
        };
        
        /**
         * Load a json schema
         * @param json schema
         */
        $scope.loadSchema = function(schema, zoom) {
            
            // asyncronous not throws exception $scope.$apply();
            setTimeout(function() {

                $scope.clearWorkbench();
                
                $scope.entities = EntityService.findAll();
                
                // create entities
                for (var i = 0, len = schema.entities.length; i < len; i++) {
                    var e = new Entity(schema.entities[i]);
                    // add entities to collection
                    EntityService.add(e);
                }

                // update scope
                $scope.$apply();

                // unbind new connection listener
                jsPlumb.unbind("connection");
            
                // create relations
                for (var i = 0, len = schema.relations.length; i < len; i++) {
                    
                    var relationOptions = {
                        targetRelatedFieldId: schema.relations[i].targetRelatedFieldId
                    };

                    if (3 === schema.relations[i].type) {
                        relationOptions['tableName'] = schema.relations[i].tableName;
                        relationOptions['sourceRelatedFieldId'] = schema.relations[i].sourceRelatedFieldId;
                    }

                    var r = RelationService.create(
                        schema.relations[i].connectionId, 
                        schema.relations[i].type, 
                        schema.relations[i].sourceEntityId,
                        schema.relations[i].targetEntityId,
                        schema.relations[i].sourceField,
                        schema.relations[i].targetField,
                        relationOptions
                    );

                    var source = $('.item[data-identifier=' + r.sourceEntityId + ']');
                    var target = $('.item[data-identifier=' + r.targetEntityId + ']');
                    
                    // create connection
                    var connectorOptions = ConnectionService.getConnectionOptions(r.type);
                    var c = jsPlumb.connect($.extend(connectorOptions, {
                        source: source, 
                        target: target
                    }));
                    c.relationId = r.connectionId;
                    
                    // bind connection listeners
                    $scope.setConnectionEvents(c, r.hoverClass);
                    
                    // add relations to collection
                    RelationService.add(r);
                    
                    // add connection to collection
                    ConnectionService.add(c);
                }
                
                // bind new connection listener
                $scope.bindNewConnection();

                // update zoom
                $scope.currentZoom = zoom;
                $scope.updateZoom();
            }, 0);
            
        };

        /**
         * Edit a relation
         * @param connection connection
         */
        $scope.editRelation = function(connection) {
            
            var modalInstance = $modal.open({
                templateUrl: 'modalNewEditRelationContent.html',
                controller: 'ModalNewEditRelationInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        return {
                            relation: angular.copy(RelationService.findById(connection.relationId)),
                            isNew: false
                        };
                    }
                }
            });

            modalInstance.result.then(function(relation) {
                
                var source = EntityService.findById(relation.sourceEntityId);
                var target = EntityService.findById(relation.targetEntityId);
    
                // update source entity field
                FieldService.load(source.fields);
                FieldService.update(relation.sourceField);

                // update target entity field
                FieldService.load(target.fields);
                FieldService.update(relation.targetField);

                // update relation
                RelationService.update(relation);
            }, function() {
//                console.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Create new relacion
         */
        $scope.newRelation = function(source, target, connection, type) {
            
            var modalInstance = $modal.open({
                templateUrl: 'modalNewEditRelationContent.html',
                controller: 'ModalNewEditRelationInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        
                        var relationId = UtilsService.getUUID();
                        
                        FieldService.load(target.fields);
                        var targetRelatedField = FieldService.findDefaultField();
                        
                        var targetField = FieldService.createRelationField(
                            UtilsService.getUUID(), 
                            UtilsService.toCamelCase(source.entityName),
                            relationId
                        );
                        
                        FieldService.load(source.fields);
                        var sourceField = FieldService.createRelationField(
                            UtilsService.getUUID(), 
                            UtilsService.toCamelCase(target.entityName),
                            relationId
                        );
                        
                        var relationOptions = {
                            targetRelatedFieldId: targetRelatedField.id
                        };
                        
                        if (3 === type) {
                            relationOptions['tableName'] = UtilsService.toSnakeCase(source.entityName + "_" + target.entityName);
                            
                            var sourceRelatedField = FieldService.findDefaultField();
                            relationOptions['sourceRelatedFieldId'] = sourceRelatedField.id;
                        }
                        
                        var relation = RelationService.create(
                            relationId,
                            type,
                            source.id,
                            target.id,
                            sourceField,
                            targetField,
                            relationOptions
                        );
                       
                        return {
                            relation: relation,
                            isNew: true
                        };
                    }
                }
            });

            modalInstance.result.then(function(relation) {
                // set relationId in connection
                connection.relationId = relation.connectionId;
                
                // bind connection listeners
                $scope.setConnectionEvents(connection, relation.hoverClass);
                
                // add relations to collection
                RelationService.add(relation);
                
                // add connection to collection
                ConnectionService.add(connection);
                
                // update fields relations
                source.relations.push(relation.connectionId);
                target.relations.push(relation.connectionId);
                
                // update entities fields
                source.fields.push(relation.sourceField);
                target.fields.push(relation.targetField);
            }, function() {
                jsPlumb.detach(connection);
//                console.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit entity fields
         * @param Entity entity
         */
        $scope.editFields = function(id) {
            
            var modalInstance = $modal.open({
                templateUrl: 'modalEditFieldsContent.html',
                controller: 'ModalEditFieldsInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        var entity = EntityService.findById(id);
                        return {
                            fields: angular.copy(entity.fields),
                            title: entity.entityName
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                var entity = EntityService.findById(id);
                entity.fields = data;
                EntityService.update(entity);
            }, function() {
//                console.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit entity
         * @param Entity entity
         */
        $scope.editEntity = function(id) {
            
            var modalInstance = $modal.open({
                templateUrl: 'modalNewEditEntityContent.html',
                controller: 'ModalNewEditEntityInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        return {
                            isNew: false,
                            entity: angular.copy(EntityService.findById(id))
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                EntityService.update(data);
            }, function() {
//                console.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Create new entity
         */
        $scope.newEntity = function() {
            
            var modalInstance = $modal.open({
                templateUrl: 'modalNewEditEntityContent.html',
                controller: 'ModalNewEditEntityInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        return {
                            isNew: true,
                            entity: EntityService.create(UtilsService.getUUID(), "", "", "")
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                EntityService.add(data);
            }, function() {
//                console.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Create new workbench
         */
        $scope.clearWorkbench = function() {
            jsPlumb.detachEveryConnection();
            for (var i = $scope.entities.length - 1, len = 0; i >= len; i--) {
                $scope.removeEntity($scope.entities[i].id);
            }
        };
        
        /** 
         * Delete an entity
         */
        $scope.removeEntity = function(entityId) {
            
            // get entity and relations
            var entity = EntityService.findById(entityId);
            var relations = RelationService.findRelationsById(entity.relations);
            
            for (var i = 0, len = relations.length; i < len; i++) {
                // remove connection
                var c = ConnectionService.findById(relations[i].connectionId);
                $scope.deleteConnection(c);
            }

            // remove entity
            EntityService.remove(entityId);
        };
        
        /**
         * Delete a connection and entity related fields
         * @param {type} connection
         */
        $scope.deleteConnection = function(connection) {
            var relationId = connection.relationId;
            
            // get relation
            var relation = RelationService.findById(relationId);
            
            // get related entities
            var source = EntityService.findById(relation.sourceEntityId);
            var target = EntityService.findById(relation.targetEntityId);
            
            // delete related fields
            FieldService.load(source.fields);
            FieldService.remove(relation.sourceField.id);
            
            FieldService.load(target.fields);
            FieldService.remove(relation.targetField.id);

            // remove relation from entities relations
            source.relations = _.remove(source.relations, function(n) {return n !== relationId;});
            target.relations = _.remove(target.relations, function(n) {return n !== relationId;});

            // remove relation
            RelationService.remove(relationId);
                
            // remove connection
            ConnectionService.remove(relationId);
            
            // detach connection
            jsPlumb.detach(connection);
        };
        
    }
]);