/**
 * One to one relation model
 * @param object data
 * @returns OneToOneRelation
 */
function OneToOneRelation(data) {
    this.connectionId = new Date().getTime();
    this.name = "One to one";
    this.type = 1;
    this.hoverClass = 'oneToOneHover';
    this.cascadeOptions = [];
    this.sourceEntityId;
    this.targetEntityId;
    this.direction;
    this.sourceRelatedFieldId;
    this.targetRelatedFieldId;
    this.sourceField;
    this.targetField;
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}

/**
 * One to many relation model
 * @param object data
 * @returns OneToManyRelation
 */
function OneToManyRelation(data) {
    this.connectionId = new Date().getTime();
    this.name = "One to many";
    this.type = 2;
    this.hoverClass = 'oneToManyHover';
    this.cascadeOptions = [];
    this.sourceEntityId;
    this.targetEntityId;
    this.direction;
    this.sourceRelatedFieldId;
    this.targetRelatedFieldId;
    this.sourceField;
    this.targetField;
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}

/**
 * Many to many relation model
 * @param object data
 * @returns ManyToManyRelation
 */
function ManyToManyRelation(data) {
    this.connectionId = new Date().getTime();
    this.name = "Many to many";
    this.type = 3;
    this.hoverClass = 'manyToManyHover';
    this.cascadeOptions = [];
    this.sourceEntityId;
    this.targetEntityId;
    this.direction;
    this.tableName;
    this.sourceRelatedFieldId;
    this.targetRelatedFieldId;
    this.sourceField;
    this.targetField;
    this.sourceManyManyField;
    this.targetManyManyField;
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}