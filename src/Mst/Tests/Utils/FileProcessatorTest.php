<?php

namespace Mst\Tests\Utils;

/**
 * @author Javi
 */
class FileProcessatorTest extends \PHPUnit_Framework_TestCase
{
    public function testWrite()
    {
        $filesDir = __DIR__.'/../../../../web/temp/test';
        $filesContent = 'hola mundo.';

        $fp = $this->getMockBuilder('Mst\Utils\FileProcessator')
                ->setMethods(null)
                ->getMock();

        // write file
        $this->assertStringStartsWith($filesDir, $fp->write($filesDir, array($filesContent), 'txt'));
    }
}
