<?php

namespace Mst\Tests\Services\Doctrine;

/**
 * @author Javi
 */
class DoctrineProcessatorTest extends \PHPUnit_Framework_TestCase 
{   
    public function testGenerateFiles()
    {
        $cm = $this->getMockBuilder('Mst\Services\Doctrine\DoctrineProcessator')
            ->setMethods(null)
            ->getMock();
        
        $cm->generateFiles(array());
    }
}