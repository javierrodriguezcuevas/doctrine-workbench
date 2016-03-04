<?php

namespace Mst\Tests\Services;

/**
 * @author Javi
 */
class FileProcessatorTest extends \PHPUnit_Framework_TestCase 
{    
    public function testWriteFiles() 
    {
        $filesDir = __DIR__ . '/../../../../web/temp/test';
        $filesContent = 'hola mundo.';
        
        $fp = $this->getMockBuilder('Mst\Services\FileProcessator')
                ->setMethods(null)
                ->getMock();

        // write file
        $this->assertStringStartsWith($filesDir, $fp->writeFiles($filesDir, array($filesContent), 'txt'));
    }
    
}
