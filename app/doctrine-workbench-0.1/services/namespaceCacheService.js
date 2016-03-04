'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.service('NamespaceCacheService', function () {
        
        var namespaces = new Array();
        
        function getNamespaces() {
            return namespaces;
        };
        
        function addNamespace(namespace) {
            if (-1 == namespaces.indexOf(namespace)) {
                namespaces.push(namespace);
            }
        };
 
        return {
            findAll: getNamespaces,
            add: addNamespace
        };
    });

})();