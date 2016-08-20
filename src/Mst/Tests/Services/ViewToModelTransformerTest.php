<?php

namespace Mst\Tests\Services;

use Mst\Tests\Fixtures\AbstractBaseTest;
use Mst\Services\ViewToModelTransformer;

/**
 * @author javi
 */
class ViewToModelTransformerTest extends AbstractBaseTest
{       
    public function testHandleJsonData()
    {
        $vmt = new ViewToModelTransformer();
        $data = stripslashes($this->jsonClientData);
        
        $metadatas = $vmt->handleJsonData($data);
        $this->assertEquals(4, sizeof($metadatas));
    }
    
    public function testParseDataArrayToMetadatas()
    {
        $vmt = new ViewToModelTransformer();
        
        $metadatas = $this->invokeMethod($vmt, 'parseDataArrayToMetadatas', array($this->parsedClientData));
        
        foreach ($metadatas as $metadata) {
            $this->assertInstanceOf('Doctrine\ORM\Mapping\ClassMetadataInfo', $metadata);
        }
    }
    
    public function testJsonDecode()
    {
        $vmt = new ViewToModelTransformer();
        
        $this->assertEquals($this->parsedClientData, $this->invokeMethod($vmt, 'jsonDecode', array($this->jsonClientData)));
    }
    
    public function testGetExporter()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'annotation' => 'Doctrine\ORM\Tools\Export\Driver\AnnotationExporter',
        );
        $dir = __DIR__;
        
        foreach ($types as $type => $value) {
            $exporter = $this->invokeMethod($vmt, 'getExporter', array($type, $dir));
            
            $this->assertInstanceOf($value, $exporter);
        }
    }
    
    
    public function testGetExporterFailYml()
    {
        $vmt = new ViewToModelTransformer();
        $dir = __DIR__;
                
        $this->setExpectedException('\InvalidArgumentException');

        $this->invokeMethod($vmt, 'getExporter', array('yml', $dir));
    }
    
    public function testGetExporterFailYaml()
    {
        $vmt = new ViewToModelTransformer();
        $dir = __DIR__;
                
        $this->setExpectedException('\InvalidArgumentException');

        $this->invokeMethod($vmt, 'getExporter', array('yaml', $dir));
    }
    
    public function testGetExporterFailXml()
    {
        $vmt = new ViewToModelTransformer();
        $dir = __DIR__;
                
        $this->setExpectedException('\InvalidArgumentException');

        $this->invokeMethod($vmt, 'getExporter', array('xml', $dir));
    }
    
    public function testGetExporterFailPhp()
    {
        $vmt = new ViewToModelTransformer();
        $dir = __DIR__;
                
        $this->setExpectedException('\InvalidArgumentException');

        $this->invokeMethod($vmt, 'getExporter', array('php', $dir));
    }
}
