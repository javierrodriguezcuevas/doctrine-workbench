<?php

namespace Mst\Tests\Models;

/**
 * @author javi
 */
class FieldRelationTest extends \PHPUnit_Framework_TestCase
{
    public function testConstructor()
    {
        $name = 'Test';

        $relationOption = $this->getMockBuilder('Mst\Models\TargetRelationOptions')
            ->disableOriginalConstructor()
            ->getMock();

        $relationOptions = array($relationOption);

        $field = $this->getMockBuilder('Mst\Models\FieldRelation')
            ->setConstructorArgs(array($name, $relationOptions))
            ->getMock();

        $this->assertInstanceOf('Mst\Models\FieldRelation', $field);
    }

    public function testConstructorArguments()
    {
        $name = '';
        $relationOptions = '';

        $this->setExpectedException('InvalidArgumentException');

        $field = $this->getMockBuilder('Mst\Models\FieldRelation')
            ->setConstructorArgs(array($name, $relationOptions))
            ->getMock();
    }
}
