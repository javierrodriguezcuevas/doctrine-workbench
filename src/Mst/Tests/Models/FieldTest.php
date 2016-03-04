<?php

namespace Mst\Tests\Models;

/**
 * @author javi
 */
class FieldTest extends \PHPUnit_Framework_TestCase 
{
    public function testConstructor()
    {
        $name = 'Test';
        $type = 'integer';
        $tableName = 'test';
        $length = 0;
        $isNotNull = false;
                
        $field = $this->getMockBuilder('Mst\Models\Field')
            ->setConstructorArgs(array($name, $type, $tableName, $length, $isNotNull))
            ->getMock();
        
        $this->assertInstanceOf('Mst\Models\Field', $field);
    }
    
    public function testConstructorArguments()
    {
        $name = '';
        $type = '';
        $tableName = '';
        $length = null;
        $isNotNull = null;

        $this->setExpectedException('InvalidArgumentException');
        
        $field = $this->getMockBuilder('Mst\Models\Field')
            ->setConstructorArgs(array($name, $type, $tableName, $length, $isNotNull))
            ->getMock();
    }
}
