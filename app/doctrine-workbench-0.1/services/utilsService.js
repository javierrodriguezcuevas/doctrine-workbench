'use strict';
 
(function () {
    
    DoctrineWorkbenchApp.service('UtilsService', function () {
        
        /**
         * Convert text to LowDash format
         * @param string str
         * @return string text
         */
        function stringToSnakeCase(str) {
           return str.replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
        };

        /**
         * Convert text to camelCase format
         * @param string str
         * @return string text
         */
        function stringToCamelCase(str) { 
           return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
               .replace(/\s/g, '')
               .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
        };

        /**
         * Generate uuid
         * @returns string
         */
        function getUUID() {
            return (Math.random().toString(18)).substr(2,20);
        };
        
        /**
         * Show bootbox alert
         * @param string msg
         * @param function callback
         */
        function bsalert(msg, callback) {
            return bootbox.alert({
                closeButton: false,
                message: msg,
                callback: callback
            });
        };

        /**
         * Show bootbox confirm
         * @param string msg
         * @param function callback
         */
        function bsconfirm(msg, callback) {
            return bootbox.dialog({
                closeButton: false,
                buttons: {
                    cancel: {
                        label: 'Cancel',
                        callback: function() { 
                            return null; 
                        },
                        className: "btn-danger"
                    },
                    confirm: {
                        label: 'OK',
                        callback: callback,
                        className: "btn-primary"
                    }
                },
                message: msg
            });
        };

        /**
         * Show bootbox prompt
         * @param string msg
         * @param function callback
         */
        function bsprompt(msg, callback) {
            return bootbox.dialog({
                closeButton: false,
                buttons: {
                    cancel: {
                        label: 'Cancel',
                        callback: function() { 
                            return null; 
                        },
                        className: "btn-danger"
                    },
                    confirm: {
                        label: 'OK',
                        callback: function(e) {
                            var $input = $(e.currentTarget).parent().prev().find('input');
                            return callback($input.val(), $input);
                        },
                        className: "btn-primary"
                    }
                },
                title: msg,
                message: '<form class="bootbox-form"><input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text"></form>'
            });
        };
        
        return {
            toSnakeCase: stringToSnakeCase,
            toCamelCase: stringToCamelCase,
            getUUID: getUUID,
            bsalert: bsalert,
            bsconfirm: bsconfirm,
            bsprompt: bsprompt
        };
        
    });

})();