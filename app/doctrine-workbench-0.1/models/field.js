/**
 * Field model
 * @param object data
 * @returns Field
 */
function Field(data) {
    this._id;
    this.id;
    this.fieldName;
    this.columnName;
    this.type;
    this.length;
    this.nullable;
    this.default;
    this.strategy;
    
    for (var prop in data) {
        this[prop] = data[prop];
    };
}