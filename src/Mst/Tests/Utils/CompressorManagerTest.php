<?php

namespace Mst\Tests\Utils;

use Mst\Utils\CompressorManager;

/**
 * @author Javi
 */
class CompressorManagerTest extends \PHPUnit_Framework_TestCase
{
    public function testGenerateZipDirNotExists()
    {
        $cm = new CompressorManager();

        $this->setExpectedException('InvalidArgumentException');

        $cm->generateZip(__DIR__.'/../../../undefined', 'test');
    }

    public function testGenerateZipParameters()
    {
        $cm = new CompressorManager();

        $this->setExpectedException('InvalidArgumentException');

        // arguments types
        $types = array(array(), true, false, 1, 0.1);

        foreach ($types as $t) {
            $cm->generateZip($t, $t);

            $cm->generateZip($t, 'test');

            $cm->generateZip('test', $t);
        }
    }

    public function testGenerateZip()
    {
        $cm = new CompressorManager();

        $this->assertInstanceOf('ZipArchive', $cm->generateZip(__DIR__.'/../../../../web/temp/test', 'test'));
    }
}
