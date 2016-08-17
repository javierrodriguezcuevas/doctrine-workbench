'use strict';

var DoctrineWorkbenchController = angular.module('DoctrineWorkbenchController', []);

DoctrineWorkbenchController.controller('IndexController', ['$scope', '$http', '$modal', 'ZoomService', 'EntityService', 'RelationService', 'ConnectionService', 'ValidatorBeforeDrop', 'DraggableWorkbenchService', 'UtilsService', '$translate',
    function($scope, $http, $modal, ZoomService, EntityService, RelationService, ConnectionService, ValidatorBeforeDrop, DraggableWorkbenchService, UtilsService, $translate) {

        $scope.entities = EntityService.findAll();
        $scope.currentZoom = 1;
        $scope.currentEntity = null;
        $scope.currentEntityForm = {};
        
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
                } else {
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
                    var result = true;
                    
                    if (!ValidatorBeforeDrop.validate(
                            info.connection.source.getAttribute('data-identifier'), 
                            info.connection.target.getAttribute('data-identifier'))) {
                        // remove created endpoint
                        if (null != info.dropEndpoint) {
                            jsPlumb.deleteEndpoint(info.dropEndpoint);
                        }
                        
                        result = false;
                    }
                    
                    return result;
                });
                
                $scope.bindNewConnectionEvent();
            });
        });
        
        /**
         * Bind jsPlumb new connection event
         */
        $scope.bindNewConnectionEvent = function() {
            // Listener on new connection to create a relation
            jsPlumb.bind("connection", function(info) {
                var relationType = ConnectionService.getTypeByHoverClass(info.sourceEndpoint.connectorHoverClass);

                if (null !== relationType) {
                    var $source = $(info.connection.source);
                    var $target = $(info.connection.target);

                    var source = EntityService.findById($source.data('identifier'));
                    var target = EntityService.findById($target.data('identifier'));

                    $scope.newRelation(source, target, info.connection, relationType);
                }
            });
        };
        
        /**
         * Bind events to connection
         * @param jsPlumbConnection connection
         * @param string hoverClass
         */
        $scope.bindConnectionEvents = function(connection, type) {
            var hoverClass = ConnectionService.getHoverClassByType(type);
            var $source = $(connection.source);
            var $target = $(connection.target);
            var source = EntityService.findById($source.data('identifier'));
            var target = EntityService.findById($target.data('identifier'));
            
            // click listener on connection to edit relation
            connection.bind('click', function(info) {
                $scope.editRelation(source, target, connection, type);
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
                    $source.addClass(hoverClass);
                    $target.addClass(hoverClass);
                }).bind('mouseout', function(info) {
                    $source.removeClass(hoverClass);
                    $target.removeClass(hoverClass);
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
                                connections: ConnectionService.getFlatConnections(),
                                entities: $scope.entities
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
                    connections: ConnectionService.getFlatConnections(),
                    entities: $scope.entities
                }
            });

            request.success(
                function(html) {
                    if (html.success) {
                        if (html.data.hasOwnProperty('downloadUrl')) {
                            location.href = html.data.downloadUrl;
                        } else if (html.data.hasOwnProperty('message')) {
                            UtilsService.bsalert(html.data.message);
                        } else {
                            UtilsService.bsalert($translate.instant('label.proccess_success'));
                        }
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
                for (var i = 0, len = schema.connections.length; i < len; i++) {
                    var type = schema.connections[i].relationType;
                    var source = $('.item[data-identifier=' + schema.connections[i].workbenchIds.sourceId + ']');
                    var target = $('.item[data-identifier=' + schema.connections[i].workbenchIds.targetId + ']');
                    
                    // create connection
                    var connectorOptions = ConnectionService.getConnectionOptions(type);
                    var connection = jsPlumb.connect($.extend(connectorOptions, {
                        source: source, 
                        target: target
                    }));
                    // add connection to collection
                    $scope.addConnection(connection, type, schema.connections[i].workbenchIds);
                }
                
                // bind new connection listener
                $scope.bindNewConnectionEvent();

                // update zoom
                $scope.currentZoom = zoom;
                $scope.updateZoom();
            }, 0);
            
        };

        /**
         * Edit a relation
         * @param connection connection
         */
        $scope.editRelation = function(source, target, connection, type) {
            var modalInstance = $modal.open({
                templateUrl: 'modalNewEditRelationContent.html',
                controller: 'ModalNewEditRelationInstanceCtrl',
                windowTemplateUrl: 'modalTemplate.html',
                size: 'lg',
                resolve: {
                    data: function() {
                        var sourceRelation = _.find(source.associationMappings, {_id: connection.workbenchIds.sourceRelationId});
                        var targetRelation = _.find(target.associationMappings, {_id: connection.workbenchIds.targetRelationId});
                        return {
                            type: type,
                            sourceFields: source.fieldMappings,
                            targetFields: target.fieldMappings,
                            sourceRelation: angular.copy(sourceRelation),
                            targetRelation: angular.copy(targetRelation),
                            isNew: false
                        };
                    }
                }
            });

            modalInstance.result.then(function(relations) {
                // update associationMappings in entities
                var sourceIndex = _.findIndex(source.associationMappings, {_id: relations.sourceRelation._id});
                source.associationMappings[sourceIndex] = relations.sourceRelation;
                EntityService.update(source);
                
                var targetIndex = _.findIndex(target.associationMappings, {_id: relations.targetRelation._id});
                target.associationMappings[targetIndex] = relations.targetRelation;
                EntityService.update(target);
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
                        var relations = RelationService.create(
                            UtilsService.getUUID(), 
                            UtilsService.getUUID(), 
                            type, 
                            [],
                            source, 
                            target
                        );
                        
                        return {
                            type: type,
                            sourceFields: source.fieldMappings,
                            targetFields: target.fieldMappings,
                            sourceRelation: relations.sourceRelation,
                            targetRelation: relations.targetRelation,
                            isNew: true
                        };
                    }
                }
            });

            modalInstance.result.then(function(relations) {
                $scope.addConnection(connection, type, {
                    'sourceId': source._id,
                    'targetId': target._id,
                    'sourceRelationId': relations.sourceRelation._id,
                    'targetRelationId': relations.targetRelation._id
                });
                
                // update fields relations
                source.associationMappings.push(relations.sourceRelation);
                target.associationMappings.push(relations.targetRelation);
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
                            fieldMappings: angular.copy(entity.fieldMappings),
                            fieldNames: angular.copy(entity.fieldNames),
                            columnNames: angular.copy(entity.columnNames),
                            title: entity.name
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                var entity = EntityService.findById(id);
                
                entity.fieldMappings = data.fieldMappings;
                entity.fieldNames = data.fieldNames;
                entity.columnNames = data.columnNames;
                EntityService.update(entity);
                
                $scope.setCurrentEntity(entity);
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

            modalInstance.result.then(function(entity) {
                $scope.updateEntityProperties(entity);
                $scope.setCurrentEntity(entity);
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
                $scope.setCurrentEntity(data);
            }, function() {
//                console.info('Modal dismissed at: ' + new Date());
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
         * Create new workbench
         */
        $scope.clearWorkbench = function() {
            jsPlumb.detachEveryConnection();
            for (var i = $scope.entities.length - 1, len = 0; i >= len; i--) {
                $scope.removeEntity($scope.entities[i]._id);
            }
        };

        /**
         * Update entity properties
         * @param entity
         */
        $scope.updateEntityProperties = function(entity) {
            var _entity = EntityService.findById(entity._id);
            _entity.name = entity.name;
            _entity.tableName = entity.tableName;
            _entity.namespace = entity.namespace;
            
            EntityService.update(_entity);
        };        
        
        /**
         * Set current entity
         * @param entity
         */
        $scope.setCurrentEntity = function(entity) {
            $('.item').removeClass('item-selected');
            $('[data-identifier="' + entity._id + '"]').addClass('item-selected');
            $scope.currentEntity = angular.copy(EntityService.findById(entity._id));
        };
        
        /**
         * Advanced options submit ok
         * @param currentEntityForm
         */
        $scope.currentEntityOk = function(currentEntityForm) {
            if (currentEntityForm.$valid) {
                $scope.updateEntityProperties($scope.currentEntity);
            }
        };
        
        /**
         * Advanced options submit cancel
         * @param currentEntityForm
         */
        $scope.currentEntityCancel = function() {
            var newCurrentEntity = angular.copy(EntityService.findById($scope.currentEntity._id));
            $scope.currentEntity = newCurrentEntity;
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
         * Delete an entity
         */
        $scope.removeEntity = function(entityId) {
            // get entity and relations
            var entity = EntityService.findById(entityId);
            var connections = ConnectionService.findByAssociationMappings(entity.associationMappings);
            
            // remove connections
            for (var i = 0, len = connections.length; i < len; i++) {
                $scope.deleteConnection(connections[i]);
            }
            
            // remove entity
            EntityService.remove(entityId);
            
            // update currentEntity
            $scope.currentEntity = null;
        };
        
        /**
         * Add a connection and related entities and bind events to connection
         * @param connection
         * @param type
         * @param workbenchIds
         */
        $scope.addConnection = function(connection, type, workbenchIds) {
            connection.relationUuid = UtilsService.getUUID();
            connection.relationType = type;
            connection.workbenchIds = workbenchIds;

            // bind connection listeners
            $scope.bindConnectionEvents(connection, type);

            // add connection to collection
            ConnectionService.add(connection);
        };
        
        /**
         * Delete a connection and entity related fields
         * @param {type} connection
         */
        $scope.deleteConnection = function(connection) {
            var sourceRelationId = connection.workbenchIds.sourceRelationId,
                targetRelationId = connection.workbenchIds.targetRelationId,
                source = EntityService.findById(connection.workbenchIds.sourceId),
                target = EntityService.findById(connection.workbenchIds.targetId);
            
            // remove relation from entities relations
            _.remove(source.associationMappings, { 'id': sourceRelationId });
            _.remove(target.associationMappings, { 'id': targetRelationId });
                
            // remove connection
            ConnectionService.remove(connection.relationUuid);
            
            // detach connection
            jsPlumb.detach(connection);
        };
    }
]);
