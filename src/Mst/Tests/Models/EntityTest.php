<?php

namespace Mst\Tests\Models;

/**
 * @author javi
 */
class EntityTest extends \PHPUnit_Framework_TestCase
{
    public function testConstructor()
    {
        $entityName = 'testEntity';
        $tableName = 'test_entity';
        $namespace = 'Test\Namespace';
        $fields = array();

        $entity = $this->getMockBuilder('Mst\Models\Entity')
            ->setConstructorArgs(array($entityName, $tableName, $namespace, $fields))
            ->getMock();

        $this->assertInstanceOf('Mst\Models\Entity', $entity);
    }

    public function testConstructorArguments()
    {
        $entityName = '';
        $tableName = '';
        $namespace = '';
        $fields = array(array());

        $this->setExpectedException('InvalidArgumentException');

        $entity = $this->getMockBuilder('Mst\Models\Entity')
            ->setConstructorArgs(array($entityName, $tableName, $namespace, $fields))
            ->getMock();
    }
}
