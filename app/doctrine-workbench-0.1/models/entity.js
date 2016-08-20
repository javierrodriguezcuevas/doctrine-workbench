/**
 * Entity model
 * @param object data
 * @returns Entity
 */
function Entity(data) {
    this._id;
    this._x = 200;
    this._y = 200;
    this.name;
    this.tableName = {
        name: ''
    };
    this.namespace;
    this.fieldNames = [];
    this.columnNames = [];
    this.generatorType = null;
    this.identifier = [];
    this.fieldMappings = [];
    this.associationMappings = [];
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}