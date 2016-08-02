<?php

namespace Mst\Tests\Services;

use Doctrine\ORM\Mapping\ClassMetadataInfo;
use Mst\Services\ViewToModelTransformer;

/**
 * @author javi
 */
class ViewToModelTransformerTest extends \PHPUnit_Framework_TestCase
{   
    protected $clientData;
    protected $parsedClientData;
    protected $jsonClientData = '{ "entities": [{ "x": 93, "y": 58, "fields": [{ "relations": [], "id": "13add6596hhde9ghb3c5", "name": "id", "tableName": "id", "length": 0, "pk": true, "nn": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "relations": [], "id": "02d86358542g17592beh", "name": "name", "tableName": "name", "length": 255, "pk": false, "nn": true, "default": null, "type": "string" }, { "relations": ["6e8ddg4edf3e8c4h59f0"], "id": "5h1ga7ed8727d26f34b1", "name": "post", "tableName": "id_post", "length": 0, "pk": false, "nn": false, "type": "", "default": null }], "relations": ["6e8ddg4edf3e8c4h59f0"], "id": "c0239139eb640d6b6geg", "entityName": "Category", "tableName": "category", "namespace": "AppBundle\\Entity" }, { "x": 406, "y": 69, "fields": [{ "relations": [], "id": "51b8d1cg8b5d02ba2hc1", "name": "id", "tableName": "id", "length": 0, "pk": true, "nn": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "relations": ["6e8ddg4edf3e8c4h59f0"], "id": "ga4072g7a6837562c9bd", "name": "category", "tableName": "id_category", "length": 0, "pk": false, "nn": false, "type": "", "default": null }, { "relations": ["gh99fb4f7869a686ggdb"], "id": "ea1g8e4h5c8h8fh6bebe", "name": "tag", "tableName": "id_tag", "length": 0, "pk": false, "nn": false, "type": "", "default": null }], "relations": ["6e8ddg4edf3e8c4h59f0", "gh99fb4f7869a686ggdb"], "id": "g82c0c95ebf04959g7ce", "entityName": "Post", "tableName": "post", "namespace": "AppBundle\\Entity" }, { "x": 724, "y": 59, "fields": [{ "relations": [], "id": "hdb0e7eh25bg1609a857", "name": "id", "tableName": "id", "length": 0, "pk": true, "nn": false, "type": "integer", "default": null, "strategy": "AUTO" }, { "relations": ["gh99fb4f7869a686ggdb"], "id": "1a8g60a378a40e5h2865", "name": "post", "tableName": "id_post", "length": 0, "pk": false, "nn": false, "type": "", "default": null }], "relations": ["gh99fb4f7869a686ggdb"], "id": "bff2340h6e3af757606b", "entityName": "Tag", "tableName": "tag", "namespace": "AppBundle\\Entity" }], "relations": [{ "connectionId": "6e8ddg4edf3e8c4h59f0", "name": "One to many", "type": 2, "hoverClass": "oneToManyHover", "cascadeOptions": [], "sourceEntityId": "c0239139eb640d6b6geg", "targetEntityId": "g82c0c95ebf04959g7ce", "sourceFieldId": "5h1ga7ed8727d26f34b1", "targetFieldId": "ga4072g7a6837562c9bd", "sourceField": { "relations": ["6e8ddg4edf3e8c4h59f0"], "id": "5h1ga7ed8727d26f34b1", "name": "post", "tableName": "id_post", "length": 0, "pk": false, "nn": false, "type": "", "default": null }, "targetField": { "relations": ["6e8ddg4edf3e8c4h59f0"], "id": "ga4072g7a6837562c9bd", "name": "category", "tableName": "id_category", "length": 0, "pk": false, "nn": false, "type": "", "default": null }, "targetRelatedFieldId": "51b8d1cg8b5d02ba2hc1" }, { "connectionId": "gh99fb4f7869a686ggdb", "name": "Many to many", "type": 3, "hoverClass": "manyToManyHover", "cascadeOptions": [], "sourceEntityId": "g82c0c95ebf04959g7ce", "targetEntityId": "bff2340h6e3af757606b", "sourceFieldId": "ea1g8e4h5c8h8fh6bebe", "targetFieldId": "1a8g60a378a40e5h2865", "sourceField": { "relations": ["gh99fb4f7869a686ggdb"], "id": "ea1g8e4h5c8h8fh6bebe", "name": "tag", "tableName": "id_tag", "length": 0, "pk": false, "nn": false, "type": "", "default": null }, "targetField": { "relations": ["gh99fb4f7869a686ggdb"], "id": "1a8g60a378a40e5h2865", "name": "post", "tableName": "id_post", "length": 0, "pk": false, "nn": false, "type": "", "default": null }, "targetRelatedFieldId": "hdb0e7eh25bg1609a857", "tableName": "post_tag", "sourceRelatedFieldId": "51b8d1cg8b5d02ba2hc1" }] }';
    protected $entitiesData = array(
        'c0239139eb640d6b6geg' => array(
            'entityName' => 'Category',
            'tableName' => 'category',
            'namespace' => 'AppBundleEntity',
        ),
        'g82c0c95ebf04959g7ce' => array(
            'entityName' => 'Post',
            'tableName' => 'post',
            'namespace' => 'AppBundleEntity',
        ),
        'bff2340h6e3af757606b' => array(
            'entityName' => 'Tag',
            'tableName' => 'tag',
            'namespace' => 'AppBundleEntity'
        )
    );
    protected $fieldsData = array(
        'c0239139eb640d6b6geg' => array(
            'fieldMappings' => array(
                array(
                    'fieldName' => 'id',
                    'columnName' => 'id',
                    'type' => 'integer',
                    'id' => true
                ),
                array(
                    'fieldName' => 'name',
                    'columnName' => 'name',
                    'type' => 'string',
                    'nullable' => true,
                    'length' => 255
                )
            ),
            'fieldNames' => array(
                'id' => 'id',
                'name' => 'name'
            ),
            'columnNames' => array(
                'id' => 'id',
                'name' => 'name'
            ),
            'generatorType' => 1,
            'identifier' => array(
                0 => 'post'
            ),
        ),
        'g82c0c95ebf04959g7ce' => array(
            'fieldMappings' => array(
                array(
                    'fieldName' => 'id',
                    'columnName' => 'id',
                    'type' => 'integer',
                    'id' => true
                )
            ),
            'fieldNames' => array(
                'id' => 'id'
            ),
            'columnNames' => array(
                'id' => 'id'
            ),
            'generatorType' => 1,
            'identifier' => array(
                0 => 'tag'
            ),
        ),
        'bff2340h6e3af757606b' => array(
            'fieldMappings' => array(
                array(
                    'fieldName' => 'id',
                    'columnName' => 'id',
                    'type' => 'integer',
                    'id' => true
                )
            ),
            'fieldNames' => array(
                'id' => 'id'
            ),
            'columnNames' => array(
                'id' => 'id'
            ),
            'generatorType' => 1,
            'identifier' => array(
                0 => 'post'
            ),
        )
    );
    protected $relationsData = array(
        '6e8ddg4edf3e8c4h59f0' => array(
            'c0239139eb640d6b6geg' => array(
                'fieldName' => 'post',
                'targetEntity' => 'AppBundleEntity\Post',
                'mappedBy' => 'category',
                'cascade' => array(),
                'type' => 4
            ),
            'g82c0c95ebf04959g7ce' => array(
                'fieldName' => 'category',
                'targetEntity' => 'AppBundleEntity\Category',
                'inversedBy' => 'post',
                'cascade' => array(),
                'type' => 2,
                'joinColumns' => array(
                    array(
                        'name' => 'id_category',
                        'referencedColumnName' => 'id'
                    )
                )
            ),
        ),
        'gh99fb4f7869a686ggdb' => array(
            'g82c0c95ebf04959g7ce' => array(
                'fieldName' => 'tag',
                'targetEntity' => 'AppBundleEntity\Tag',
                'mappedBy' => 'post',
                'cascade' => array(),
                'type' => 8,
                'joinTable' => array(
                    'name' => 'post_tag',
                    'joinColumns' => array(
                        array(
                            'name' => 'id_post',
                            'referencedColumnName' => 'id'
                        )
                    ),
                    'inverseJoinColumns' => array(
                        array(
                            'name' => 'id_tag',
                            'referencedColumnName' => 'id'
                        )
                    )
                )
            ),
            'bff2340h6e3af757606b' => array(
                'fieldName' => 'post',
                'targetEntity' => 'AppBundleEntity\Post',
                'inversedBy' => 'tag',
                'cascade' => array(),
                'type' => 8,
            ),
        )
    );
    
    public function testHandleJsonData()
    {
        $dest = __DIR__;
        $types = array(
            'annotation' => 'Doctrine\ORM\Tools\Export\Driver\AnnotationExporter',
            'yaml' => 'Doctrine\ORM\Tools\Export\Driver\YamlExporter',
            'yml' => 'Doctrine\ORM\Tools\Export\Driver\YamlExporter',
            'xml' => 'Doctrine\ORM\Tools\Export\Driver\XmlExporter',
            'php' => 'Doctrine\ORM\Tools\Export\Driver\PhpExporter'
        );
        $data = stripslashes($this->jsonClientData);
        
        foreach ($types as $type => $driver) {
            $vmt = $this->getMockVmt($driver);
            $vmt->handleJsonData($data, $type, $dest);
        }
    }
    
    protected function setUp()
    {
        $this->clientData = json_decode(stripslashes($this->jsonClientData));
        $this->parsedClientData = array(
            'c0239139eb640d6b6geg' => array_merge($this->entitiesData['c0239139eb640d6b6geg'], $this->fieldsData['c0239139eb640d6b6geg']),
            'g82c0c95ebf04959g7ce' => array_merge($this->entitiesData['g82c0c95ebf04959g7ce'], $this->fieldsData['g82c0c95ebf04959g7ce']),
            'bff2340h6e3af757606b' => array_merge($this->entitiesData['bff2340h6e3af757606b'], $this->fieldsData['bff2340h6e3af757606b'])
        );
        $this->parsedClientData['c0239139eb640d6b6geg']['associationMappings'] = array(
            $this->relationsData['6e8ddg4edf3e8c4h59f0']['c0239139eb640d6b6geg']
        );
        $this->parsedClientData['g82c0c95ebf04959g7ce']['associationMappings'] = array(
            $this->relationsData['6e8ddg4edf3e8c4h59f0']['g82c0c95ebf04959g7ce'],
            $this->relationsData['gh99fb4f7869a686ggdb']['g82c0c95ebf04959g7ce']
        );
        $this->parsedClientData['bff2340h6e3af757606b']['associationMappings'] = array(
            $this->relationsData['gh99fb4f7869a686ggdb']['bff2340h6e3af757606b'])
        ;
    }
    
    public function testParseJsonDataToArray()
    {
        $vmt = new ViewToModelTransformer();
        
        $data = $this->clientData;
        
        $this->assertEquals($this->parsedClientData, $this->invokeMethod($vmt, 'parseJsonDataToArray', array($data->entities, $data->relations)));
    }
    
    public function testParseDataArrayToMetadatas()
    {
        $vmt = new ViewToModelTransformer();
        
        $data = $this->parsedClientData;
        
        $metadatas = $this->invokeMethod($vmt, 'parseDataArrayToMetadatas', array($data));
        
        foreach ($metadatas as $metadata) {
            $this->assertInstanceOf('Doctrine\ORM\Mapping\ClassMetadataInfo', $metadata);
        }
    }
    
    public function testGenerateFieldsMappings()
    {
        $vmt = new ViewToModelTransformer();
        
        $dataFields = array();
        foreach ($this->clientData->entities as $entity) {
            $dataFields[$entity->id] = $entity->fields;
        }
        
        foreach ($dataFields as $id => $fields) {
            $this->assertEquals($this->fieldsData[$id], $this->invokeMethod($vmt, 'generateFieldsMappings', array($fields)));
        }
    }

    public function testGenerateAssociationMappings() 
    {
        $vmt = new ViewToModelTransformer();
        
        $data = $this->clientData;
        
        $this->assertEquals($this->relationsData, $this->invokeMethod($vmt, 'generateAssociationMappings', array($data->entities, $data->relations)));
    }
    
    public function testGetExporter()
    {
        $vmt = new ViewToModelTransformer();
        
        $dir = __DIR__;
        $types = array(
            'annotation' => 'Doctrine\ORM\Tools\Export\Driver\AnnotationExporter',
            'yaml' => 'Doctrine\ORM\Tools\Export\Driver\YamlExporter',
            'yml' => 'Doctrine\ORM\Tools\Export\Driver\YamlExporter',
            'xml' => 'Doctrine\ORM\Tools\Export\Driver\XmlExporter', 
            'php' => 'Doctrine\ORM\Tools\Export\Driver\PhpExporter'
        );
                
        foreach ($types as $type => $value) {
            $exporter = $this->invokeMethod($vmt, 'getExporter', array($type, $dir));
            
            $this->assertInstanceOf($value, $exporter);
        }
    }
    
    public function testGetRelationType()
    {
        $vmt = new ViewToModelTransformer();
        $relationTypes = array(1 => ClassMetadataInfo::ONE_TO_ONE, 3 => ClassMetadataInfo::MANY_TO_MANY);
        
        foreach ($relationTypes as $relationType => $value) {
            $this->assertEquals($value, $this->invokeMethod($vmt, 'getRelationType', array($relationType)));
        }
                
        $this->assertEquals(ClassMetadataInfo::ONE_TO_MANY, $this->invokeMethod($vmt, 'getRelationType', array(2, 'source')));
        $this->assertEquals(ClassMetadataInfo::MANY_TO_ONE, $this->invokeMethod($vmt, 'getRelationType', array(2, 'target')));
    }

    public function testGetGeneratorType()
    {
        $vmt = new ViewToModelTransformer();
        $strategies = array('AUTO' => 1);
        
        foreach ($strategies as $strategy => $value) {
            $this->assertEquals($value, $this->invokeMethod($vmt, 'getGeneratorType', array($strategy)));
        }
    }
    
    public function testJsonDecode()
    {
        $vmt = new ViewToModelTransformer();
        
        $data = json_encode($this->clientData);
        $result = $this->clientData;
        $this->assertEquals($result, $this->invokeMethod($vmt, 'jsonDecode', array($data)));
    }
    
    /**
     * Get a Mock of ViewToModelTransformer
     * 
     * @param string $driver
     * 
     * @return ViewToModelTransformer
     */
    protected function getMockVmt($driver)
    {
        $exporterMock = $this->getMockBuilder($driver)
            ->setMethods(array('setMetadata', 'export'))
            ->getMock()
        ;
        $exporterMock->expects($this->once())
            ->method('export')
            ->will($this->returnValue(null))
        ;
        $exporterMock->expects($this->once())
            ->method('setMetadata')
            ->will($this->returnValue(null));
        
        $vmtMock = $this->getMockBuilder('Mst\Services\ViewToModelTransformer')
            ->setMethods(array('getExporter'))
            ->getMock();
        $vmtMock->expects($this->once())
            ->method('getExporter')
            ->will($this->returnValue($exporterMock))
        ;
        
        return $vmtMock;
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
