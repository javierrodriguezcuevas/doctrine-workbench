/**
 * Entity model
 * @param object data
 * @returns Entity
 */
function Entity(data) {
    this.id;
    this.entityName;
    this.tableName;
    this.namespace;
    this.x = 200;
    this.y = 200;
    this.fields = [];
    this.relations = [];
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}