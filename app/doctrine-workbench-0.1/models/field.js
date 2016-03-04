/**
 * Field model
 * @param object data
 * @returns Field
 */
function Field(data) {
    this.id;
    this.name;
    this.tableName;
    this.type;
    this.length;
    this.pk;
    this.nn;
    this.default;
    this.strategy;
    this.relations = [];
    
    for (var prop in data) {
        this[prop] = data[prop];
    };
}