<?php

namespace Mst\Services\ModelTransformer;

use Doctrine\ORM\Mapping\ClassMetadataInfo;

/**
 * @author javi
 */
class AbstractModelTransformerTest extends \PHPUnit_Framework_TestCase
{       
    public function testGetRelationType()
    {
        $amt = $this->getMockAbstractModelTransformer();
                
        $this->assertEquals(ClassMetadataInfo::ONE_TO_ONE, $this->invokeMethod($amt, 'getRelationType', array(1)));
        $this->assertEquals(ClassMetadataInfo::ONE_TO_MANY, $this->invokeMethod($amt, 'getRelationType', array(2, 'source')));
        $this->assertEquals(ClassMetadataInfo::MANY_TO_ONE, $this->invokeMethod($amt, 'getRelationType', array(2, 'target')));
        $this->assertEquals(ClassMetadataInfo::MANY_TO_MANY, $this->invokeMethod($amt, 'getRelationType', array(3)));
    }

    public function testGetGeneratorType()
    {
        $amt = $this->getMockAbstractModelTransformer();
        $strategies = array('AUTO' => 1);
        
        foreach ($strategies as $strategy => $value) {
            $this->assertEquals($value, $this->invokeMethod($amt, 'getGeneratorType', array($strategy)));
        }
    }
    
    public function testGetCascadeOptions()
    {
        $amt = $this->getMockAbstractModelTransformer();
        
        $cascadeOptions = array(
            'persist',
            'remove',
            'detach',
            'merge',
            'refresh',
        );
        $result = array(
            'isCascadePersist' => true,
            'isCascadeRemove' => true,
            'isCascadeDetach' => true,
            'isCascadeMerge' => true,
            'isCascadeRefresh' => true,
        );
        
        $this->assertEquals($result, $this->invokeMethod($amt, 'getCascadeOptions', array($cascadeOptions)));
    }
    
    /**
     * Get a Mock of AbstractModelTransformer
     * 
     * @return AbstractModelTransformer
     */
    protected function getMockAbstractModelTransformer()
    {
        $mock = $this->getMockBuilder('Mst\Services\ModelTransformer\AbstractModelTransformer')
            ->getMock();
        
        return $mock;
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
