'use strict';

(function(lodash){
    // Changelog
    // v4.0.0
    // Jan. 12, 2016 — Diff — Docs
    // Removed _.contains in favor of _.includes
    if (!lodash.contains) {
        lodash.contains = lodash.includes;
    }
})(_);

var connectorCommonOptions = {
    connector: ["Flowchart", {cornerRadius: 5}],
    connectionsDetachable: false,
    anchor: ["TopCenter", "RightMiddle", "LeftMiddle", "BottomCenter"],
    endpoint: ["Dot", {
        radius: 8
    }],
    paintStyle: {fillStyle: "gray"},
    style: {strokeStyle: "gray", lineWidth: 2},
    hoverStyle: {lineWidth: 2},
    connectorStyle: {strokeStyle: "gray", lineWidth: 2},
    connectorHoverStyle: {lineWidth: 2}
};

var customOverlayTemplate = '<div>'
        + '<span>%text%</span>'
        + '<hr class="hr-small"/>'
        + '<span class="border-right">'
            + '<i class="icon icon-edit"></i>&nbsp;'
        + '</span>'
        + '&nbsp;'
        + '<span>'
            + '<i class="glyphicon glyphicon-remove text-muted"></i>'
        + '</span>'
    + '</div>';

var overlaysOneToOne = [
    ["Custom", {
        create: function(component) {
            return $(customOverlayTemplate.replace('%text%', '1/1'));
        },
        location: 0.5,
        cssClass: 'aLabel oneToOneHover'
    }],
    ["Arrow", {
        width: 10, 
        length: 30, 
        location: 1, 
        cssClass: 'aLabel oneToOneHover'
    }]
];

var overlaysOneToMany = [
    ["Custom", {
        create: function(component) {
            return $(customOverlayTemplate.replace('%text%', '1/N'));
        },
        location: 0.5,
        cssClass: 'aLabel oneToManyHover'
    }],
    ["Arrow", {
        width: 10, 
        length: 30, 
        location: 1, 
        cssClass: 'aLabel oneToManyHover'
    }]
];

var overlaysManyToMany = [
    ["Custom", {
        create: function(component) {
            return $(customOverlayTemplate.replace('%text%', 'N/M'));
        },
        location: 0.5,
        cssClass: 'aLabel manyToManyHover'
    }]
];

var DoctrineWorkbenchApp = angular.module('DoctrineWorkbenchApp', [
    'ngRoute',
    'DoctrineWorkbenchController',
    'ui.bootstrap',
    'ng-dropdown-multiselect',
    'ui.sortable',
    'ui.bootstrap-slider',
    'pascalprecht.translate'
]);

DoctrineWorkbenchApp.config(['$routeProvider', '$translateProvider',
    function($routeProvider, $translateProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        });
        
        $translateProvider.translations('en', translations_EN);
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
    }
]);