/**
 * One to one relation model
 * @param object data
 * @returns OneToOneRelation
 */
function OneToOneRelation(data) {
    this._id = new Date().getTime();
    this._name = "One to one";
    this.fieldName;
    this.targetEntity;
    this.type = 1;
    this.cascade = [];
    this.inversedBy;
    this.mappedBy;
    this.joinColumns = [];
    
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
    this._id = new Date().getTime();
    this._name = "One to many";
    this.fieldName;
    this.targetEntity;
    this.type = 2;
    this.cascade = [];
    this.inversedBy;
    this.mappedBy;
    this.joinColumns = [];
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}

/**
 * Many to one relation model
 * @param object data
 * @returns ManyToOneRelation
 */
function ManyToOneRelation(data) {
    this._id = new Date().getTime();
    this._name = "Many to one";
    this.fieldName;
    this.targetEntity;
    this.type = 4;
    this.cascade = [];
    this.inversedBy;
    this.mappedBy;
    this.joinColumns = [];
    
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
    this._id = new Date().getTime();
    this._name = "Many to many";
    this.fieldName;
    this.targetEntity;
    this.type = 3;
    this.cascade = [];
    this.inversedBy;
    this.mappedBy;
    this.joinTable = [];
    
    for (var prop in data) {
        this[prop] = data[prop];
    }
}
