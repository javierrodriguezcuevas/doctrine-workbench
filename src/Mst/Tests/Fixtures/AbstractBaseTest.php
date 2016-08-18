<?php

namespace Mst\Tests\Fixtures;

/**
 * @author javi
 */
abstract class AbstractBaseTest extends \PHPUnit_Framework_TestCase
{   
    /** @var string */
    protected $jsonClientData = '{"entities": [{ "_x": 195, "_y": 239, "tableName": { "name": "category" }, "fieldNames": [{ "id": "id" }, { "name": "name" }], "columnNames": [{ "id": "id" }, { "name": "name" }], "generatorType": null, "identifier": [], "fieldMappings": [{ "_id": "g9759d97c0a4hb2b430g", "fieldName": "id", "columnName": "id", "length": 0, "id": true, "nullable": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "_id": "11ceh86cdgge6h6ae18h", "fieldName": "name", "columnName": "name", "length": 255, "id": false, "nullable": false, "default": null, "type": "string" }], "associationMappings": [{ "_id": "f7d8ec55d0ee467g7b6c", "_name": "One to one", "type": 1, "cascade": [], "joinColumns": [], "fieldName": "categoryColor", "targetEntity": "CategoryColor", "mappedBy": "category" }, { "_id": "fbdg95eebb6131h1b67b", "_name": "One to many", "type": 2, "cascade": [], "joinColumns": [], "fieldName": "post", "targetEntity": "Post", "mappedBy": "category" }], "_id": "0857f3b33bbe988c5096", "name": "Category", "namespace": "AppBundle\\Entity"}, { "_x": 72, "_y": 21, "tableName": { "name": "category_color" }, "fieldNames": [{ "id": "id" }, { "color": "color" }], "columnNames": [{ "id": "id" }, { "color": "color" }], "generatorType": null, "identifier": [], "fieldMappings": [{ "_id": "333d54c210155c04chh0", "fieldName": "id", "columnName": "id", "length": 0, "id": true, "nullable": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "_id": "578hb2ag25f0b9cca2f1", "fieldName": "color", "columnName": "color", "length": 255, "id": false, "nullable": false, "default": null, "type": "string" }], "associationMappings": [{ "_id": "h830e306747d3e18940g", "_name": "One to one", "type": 1, "cascade": [], "joinColumns": [{ "name": "id_category", "referencedColumnName": "id" }], "fieldName": "category", "targetEntity": "Category", "inversedBy": "categoryColor" }], "_id": "ab830df4f828f18c9ffh", "name": "CategoryColor", "namespace": "AppBundle\\Entity"}, { "_x": 489, "_y": 106, "tableName": { "name": "post" }, "fieldNames": [{ "id": "id" }, { "title": "title" }], "columnNames": [{ "id": "id" }, { "title": "title" }], "generatorType": null, "identifier": [], "fieldMappings": [{ "_id": "ha26hd286a9143fcg1f8", "fieldName": "id", "columnName": "id", "length": 0, "id": true, "nullable": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "_id": "gg8070457g04g88g61gh", "fieldName": "title", "columnName": "title", "length": 255, "id": false, "nullable": false, "default": null, "type": "string" }], "associationMappings": [{ "_id": "h3373dh9e86hah9gf668", "_name": "One to many", "type": 2, "cascade": [], "joinColumns": [{ "name": "id_category", "referencedColumnName": "id" }], "fieldName": "category", "targetEntity": "Category", "inversedBy": "post" }, { "_id": "811161eh3hcf603f5e1h", "_name": "Many to many", "type": 3, "cascade": [], "joinTable": { "name": "post_tag", "joinColumns": [{ "name": "id", "referencedColumnName": "id" }], "inverseJoinColumns": [{ "name": "id", "referencedColumnName": "id" }] }, "fieldName": "tag", "targetEntity": "Tag", "mappedBy": "post" }], "_id": "e4fe4850h226b6830183", "name": "Post", "namespace": "AppBundle\\Entity"}, { "_x": 823, "_y": 170, "tableName": { "name": "tag" }, "fieldNames": [{ "id": "id" }, { "name": "name" }], "columnNames": [{ "id": "id" }, { "name": "name" }], "generatorType": null, "identifier": [], "fieldMappings": [{ "_id": "ha96ee8bag061he2ae7f", "fieldName": "id", "columnName": "id", "length": 0, "id": true, "nullable": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "_id": "4fehfd8d62h0403egfh3", "fieldName": "name", "columnName": "name", "length": 255, "id": false, "nullable": false, "default": null, "type": "string" }], "associationMappings": [{ "_id": "bf7c792029ghcfae9a01", "_name": "Many to many", "type": 3, "cascade": [], "joinTable": [], "fieldName": "post", "targetEntity": "Post", "inversedBy": "tag" }], "_id": "c7c6e745fh8e6397e861", "name": "Tag", "namespace": "AppBundle\\Entity"}]}';
    /** @var array */
    protected $parsedClientData;
    
    protected function tearDown()
    {
        unset(
            $this->jsonClientData,
            $this->parsedClientData
        );
    }
    
    protected function setUp()
    {
        $this->jsonClientData = stripslashes($this->jsonClientData);
        $this->parsedClientData = json_decode($this->jsonClientData, true);
    }
    
    /**
     * Call protected/private method of a class.
     *
     * @param object &$object    Instantiated object that we will run method on.
     * @param string $methodName Method name to call
     * @param array  $parameters Array of parameters to pass into method.
     *
     * @return mixed Method return.
     */
    protected function invokeMethod(&$object, $methodName, array $parameters = array())
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $parameters);
    }
}
