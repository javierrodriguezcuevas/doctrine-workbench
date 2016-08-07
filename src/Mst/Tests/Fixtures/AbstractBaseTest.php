<?php

namespace Mst\Tests\Fixtures;

/**
 * @author javi
 */
abstract class AbstractBaseTest extends \PHPUnit_Framework_TestCase
{   
    /** @var stdObj */
    protected $clientData;
    /** @var array */
    protected $parsedClientData;
    /** @var string */
    protected $jsonClientData = '{"entities":[{"x":93,"y":58,"fields":[{"relations":[],"id":"13add6596hhde9ghb3c5","name":"id","tableName":"id","length":0,"pk":true,"nn":false,"type":"integer","default":null,"strategy":"AUTO"},{"relations":[],"id":"02d86358542g17592beh","name":"name","tableName":"name","length":255,"pk":false,"nn":true,"default":null,"type":"string"},{"relations":["6e8ddg4edf3e8c4h59f0"],"id":"5h1ga7ed8727d26f34b1","name":"post","tableName":"id_post","length":0,"pk":false,"nn":false,"type":"","default":null},{"relations":["c87h56f160964c61hc79"],"id":"34gfeb60eh01h3h49g42","name":"categoryColor","tableName":"categoryColor","length":0,"pk":false,"nn":false,"type":"","default":null}],"relations":["6e8ddg4edf3e8c4h59f0","c87h56f160964c61hc79"],"id":"c0239139eb640d6b6geg","entityName":"Category","tableName":"category","namespace":"AppBundle\\Entity"},{"x":406,"y":69,"fields":[{"relations":[],"id":"51b8d1cg8b5d02ba2hc1","name":"id","tableName":"id","length":0,"pk":true,"nn":false,"type":"integer","default":null,"strategy":"AUTO"},{"relations":["6e8ddg4edf3e8c4h59f0"],"id":"ga4072g7a6837562c9bd","name":"category","tableName":"id_category","length":0,"pk":false,"nn":false,"type":"","default":null},{"relations":["gh99fb4f7869a686ggdb"],"id":"ea1g8e4h5c8h8fh6bebe","name":"tag","tableName":"id_tag","length":0,"pk":false,"nn":false,"type":"","default":null}],"relations":["6e8ddg4edf3e8c4h59f0","gh99fb4f7869a686ggdb"],"id":"g82c0c95ebf04959g7ce","entityName":"Post","tableName":"post","namespace":"AppBundle\\Entity"},{"x":724,"y":59,"fields":[{"relations":[],"id":"hdb0e7eh25bg1609a857","name":"id","tableName":"id","length":0,"pk":true,"nn":false,"type":"integer","default":null,"strategy":"AUTO"},{"relations":["gh99fb4f7869a686ggdb"],"id":"1a8g60a378a40e5h2865","name":"post","tableName":"id_post","length":0,"pk":false,"nn":false,"type":"","default":null}],"relations":["gh99fb4f7869a686ggdb"],"id":"bff2340h6e3af757606b","entityName":"Tag","tableName":"tag","namespace":"AppBundle\\Entity"},{"x":94,"y":303,"fields":[{"relations":[],"id":"fgefb07129fc270gc0cc","name":"id","tableName":"id","length":0,"pk":true,"nn":false,"type":"integer","default":null,"strategy":"AUTO"},{"relations":[],"id":"963d64bc14f1fb5ga327","name":"value","tableName":"value","length":255,"pk":false,"nn":true,"default":null,"type":"string"},{"relations":["c87h56f160964c61hc79"],"id":"e492cahad917771ef80g","name":"category","tableName":"category","length":0,"pk":false,"nn":false,"type":"","default":null}],"relations":["c87h56f160964c61hc79"],"id":"17ab29088b6dghfg9681","entityName":"CategoryColor","tableName":"category_color","namespace":"AppBundle\\Entity"}],"relations":[{"connectionId":"6e8ddg4edf3e8c4h59f0","name":"One to many","type":2,"hoverClass":"oneToManyHover","cascadeOptions":[],"sourceEntityId":"c0239139eb640d6b6geg","targetEntityId":"g82c0c95ebf04959g7ce","sourceFieldId":"5h1ga7ed8727d26f34b1","targetFieldId":"ga4072g7a6837562c9bd","sourceField":{"relations":["6e8ddg4edf3e8c4h59f0"],"id":"5h1ga7ed8727d26f34b1","name":"post","tableName":"id_post","length":0,"pk":false,"nn":false,"type":"","default":null},"targetField":{"relations":["6e8ddg4edf3e8c4h59f0"],"id":"ga4072g7a6837562c9bd","name":"category","tableName":"id_category","length":0,"pk":false,"nn":false,"type":"","default":null},"targetRelatedFieldId":"51b8d1cg8b5d02ba2hc1"},{"connectionId":"gh99fb4f7869a686ggdb","name":"Many to many","type":3,"hoverClass":"manyToManyHover","cascadeOptions":[],"sourceEntityId":"g82c0c95ebf04959g7ce","targetEntityId":"bff2340h6e3af757606b","sourceFieldId":"ea1g8e4h5c8h8fh6bebe","targetFieldId":"1a8g60a378a40e5h2865","sourceField":{"relations":["gh99fb4f7869a686ggdb"],"id":"ea1g8e4h5c8h8fh6bebe","name":"tag","tableName":"id_tag","length":0,"pk":false,"nn":false,"type":"","default":null},"targetField":{"relations":["gh99fb4f7869a686ggdb"],"id":"1a8g60a378a40e5h2865","name":"post","tableName":"id_post","length":0,"pk":false,"nn":false,"type":"","default":null},"targetRelatedFieldId":"hdb0e7eh25bg1609a857","tableName":"post_tag","sourceRelatedFieldId":"51b8d1cg8b5d02ba2hc1"},{"connectionId":"c87h56f160964c61hc79","name":"One to one","type":1,"hoverClass":"oneToOneHover","cascadeOptions":[],"sourceEntityId":"c0239139eb640d6b6geg","targetEntityId":"17ab29088b6dghfg9681","sourceFieldId":"34gfeb60eh01h3h49g42","targetFieldId":"e492cahad917771ef80g","sourceField":{"relations":["c87h56f160964c61hc79"],"id":"34gfeb60eh01h3h49g42","name":"categoryColor","tableName":"categoryColor","length":0,"pk":false,"nn":false,"type":"","default":null},"targetField":{"relations":["c87h56f160964c61hc79"],"id":"e492cahad917771ef80g","name":"category","tableName":"category","length":0,"pk":false,"nn":false,"type":"","default":null},"targetRelatedFieldId":"fgefb07129fc270gc0cc"}]}';
    /** @var array */
    protected $entitiesData = array(
        'c0239139eb640d6b6geg' => array(
            'entityName' => 'Category',
            'tableName' => array(
                'name' => 'category'
            ),
            'namespace' => 'AppBundleEntity',
        ),
        'g82c0c95ebf04959g7ce' => array(
            'entityName' => 'Post',
            'tableName' => array(
                'name' => 'post'
            ),
            'namespace' => 'AppBundleEntity',
        ),
        'bff2340h6e3af757606b' => array(
            'entityName' => 'Tag',
            'tableName' => array(
                'name' => 'tag'
            ),
            'namespace' => 'AppBundleEntity'
        ),
        '17ab29088b6dghfg9681' => array(
            'entityName' => 'CategoryColor',
            'tableName' => array(
                'name' => 'category_color'
            ),
            'namespace' => 'AppBundleEntity'
        )
    );
    /** @var array */
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
                0 => 'categoryColor'
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
        ),
        '17ab29088b6dghfg9681' => array(
            'fieldMappings' => array(
                array(
                    'fieldName' => 'id',
                    'columnName' => 'id',
                    'type' => 'integer',
                    'id' => true
                ),
                array(
                    'fieldName' => 'value',
                    'columnName' => 'value',
                    'type' => 'string',
                    'length' => 255,
                    'nullable' => true
                )
            ),
            'fieldNames' => array(
                'id' => 'id',
                'value' => 'value'
            ),
            'columnNames' => array(
                'id' => 'id',
                'value' => 'value'
            ),
            'generatorType' => 1,
            'identifier' => array(
                0 => 'category'
            ),
        )
    );
    /** @var array */
    protected $relationsData = array(
        '6e8ddg4edf3e8c4h59f0' => array(
            'c0239139eb640d6b6geg' => array(
                'fieldName' => 'post',
                'targetEntity' => 'AppBundleEntity\Post',
                'mappedBy' => 'category',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
                'type' => 4,
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            ),
            'g82c0c95ebf04959g7ce' => array(
                'fieldName' => 'category',
                'targetEntity' => 'AppBundleEntity\Category',
                'inversedBy' => 'post',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
                'type' => 2,
                'joinColumns' => array(
                    array(
                        'name' => 'id_category',
                        'referencedColumnName' => 'id'
                    )
                ),
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            ),
        ),
        'gh99fb4f7869a686ggdb' => array(
            'g82c0c95ebf04959g7ce' => array(
                'fieldName' => 'tag',
                'targetEntity' => 'AppBundleEntity\Tag',
                'mappedBy' => 'post',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
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
                ),
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            ),
            'bff2340h6e3af757606b' => array(
                'fieldName' => 'post',
                'targetEntity' => 'AppBundleEntity\Post',
                'inversedBy' => 'tag',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
                'type' => 8,
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            ),
        ),
        'c87h56f160964c61hc79' => array(
            'c0239139eb640d6b6geg' => array(
                'fieldName' => 'categoryColor',
                'targetEntity' => 'AppBundleEntity\CategoryColor',
                'mappedBy' => 'category',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
                'type' => 1,
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            ),
            '17ab29088b6dghfg9681' => array(
                'fieldName' => 'category',
                'targetEntity' => 'AppBundleEntity\Category',
                'inversedBy' => 'categoryColor',
                'cascade' => array(
                    'isCascadePersist' => false,
                    'isCascadeRemove' => false,
                    'isCascadeDetach' => false,
                    'isCascadeMerge' => false,
                    'isCascadeRefresh' => false,
                ),
                'type' => 1,
                'joinColumns' => array(
                    array(
                        'name' => 'category',
                        'referencedColumnName' => 'id'
                    )
                ),
                'isCascadePersist' => false,
                'isCascadeRemove' => false,
                'isCascadeDetach' => false,
                'isCascadeMerge' => false,
                'isCascadeRefresh' => false,
            )
        )
    );
    
    protected function tearDown()
    {
        unset(
            $this->clientData, 
            $this->parsedClientData, 
            $this->jsonClientData,
            $this->entitiesData,
            $this->fieldsData,
            $this->relationsData
        );
    }
    
    protected function setUp()
    {
        $this->clientData = json_decode(stripslashes($this->jsonClientData));
        $this->parsedClientData = array(
            'c0239139eb640d6b6geg' => array_merge(
                $this->entitiesData['c0239139eb640d6b6geg'],
                $this->fieldsData['c0239139eb640d6b6geg']
            ),
            'g82c0c95ebf04959g7ce' => array_merge(
                $this->entitiesData['g82c0c95ebf04959g7ce'], 
                $this->fieldsData['g82c0c95ebf04959g7ce']
            ),
            'bff2340h6e3af757606b' => array_merge(
                $this->entitiesData['bff2340h6e3af757606b'], 
                $this->fieldsData['bff2340h6e3af757606b']
            ),
            '17ab29088b6dghfg9681' => array_merge(
                $this->entitiesData['17ab29088b6dghfg9681'], 
                $this->fieldsData['17ab29088b6dghfg9681']
            )
        );
        $this->parsedClientData['17ab29088b6dghfg9681']['associationMappings'] = array(
            $this->relationsData['c87h56f160964c61hc79']['17ab29088b6dghfg9681']
        );
        $this->parsedClientData['c0239139eb640d6b6geg']['associationMappings'] = array(
            $this->relationsData['6e8ddg4edf3e8c4h59f0']['c0239139eb640d6b6geg'],
            $this->relationsData['c87h56f160964c61hc79']['c0239139eb640d6b6geg']
        );
        $this->parsedClientData['g82c0c95ebf04959g7ce']['associationMappings'] = array(
            $this->relationsData['6e8ddg4edf3e8c4h59f0']['g82c0c95ebf04959g7ce'],
            $this->relationsData['gh99fb4f7869a686ggdb']['g82c0c95ebf04959g7ce'],
        );
        $this->parsedClientData['bff2340h6e3af757606b']['associationMappings'] = array(
            $this->relationsData['gh99fb4f7869a686ggdb']['bff2340h6e3af757606b'])
        ;
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
