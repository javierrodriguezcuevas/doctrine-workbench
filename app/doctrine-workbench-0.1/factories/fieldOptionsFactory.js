DoctrineWorkbenchApp.factory('FieldOptionsFactory', function() {
    return {
        getFieldTypes: function() {
            return [
                {id: 'smallint', name: "Smallint", length: false, pk: true, nn: false, default: true},
                {id: 'integer', name: "Integer", length: false, pk: true, nn: false, default: true}, 
                {id: 'bigint', name: "Bigint", length: false, pk: true, nn: false, default: true}, 
                {id: 'decimal', name: "Decimal", length: false, pk: false, nn: true, default: true}, 
                {id: 'float', name: "Float", length: false, pk: false, nn: true, default: true}, 
                {id: 'string', name: "String", length: 255, pk: false, nn: true, default: true}, 
                {id: 'text', name: "Text", length: false, pk: false, nn: true, default: false},
                {id: 'boolean', name: "Boolean", length: false, pk: false, nn: true, default: true},
                {id: 'date', name: "Date", length: false, pk: false, nn: true, default: false},
                {id: 'datetime', name: "Datetime", length: false, pk: false, nn: true, default: false},
                {id: 'time', name: "Time", length: false, pk: false, nn: true, default: false}
            ];
        },
        getStrategies: function() {
            return [
                {id: "AUTO", name: "AUTO"},
                {id: "SEQUENCE", name: "SEQUENCE"},
                {id: "TABLE", name: "TABLE"},
                {id: "IDENTITY", name: "IDENTITY"},
                {id: "UUID", name: "UUID"},
                {id: "NONE", name: "NONE"}
            ];
        }
    };
});