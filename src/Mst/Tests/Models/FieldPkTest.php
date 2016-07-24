<?php

namespace Mst\Tests\Models;

/**
 * @author javi
 */
class FieldPkTest extends \PHPUnit_Framework_TestCase
{
    public function testConstructor()
    {
        $name = 'Test';
        $type = 'integer';
        $tableName = 'test';
        $strategy = 'AUTO';

        $field = $this->getMockBuilder('Mst\Models\FieldPk')
            ->setConstructorArgs(array($name, $type, $tableName, $strategy))
            ->getMock();

        $this->assertInstanceOf('Mst\Models\FieldPk', $field);
    }

    public function testConstructorArguments()
    {
        $name = '';
        $type = '';
        $tableName = '';
        $strategy = 'AUTO';

        $this->setExpectedException('InvalidArgumentException');

        $field = $this->getMockBuilder('Mst\Models\FieldPk')
            ->setConstructorArgs(array($name, $type, $tableName, $strategy))
            ->getMock();
    }
}
