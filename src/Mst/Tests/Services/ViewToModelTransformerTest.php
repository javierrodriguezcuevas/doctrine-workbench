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
        
        $types = array(
            'annotation',
        );
        $dest = sys_get_temp_dir();
        $data = stripslashes($this->jsonClientData);
        
        foreach ($types as $type) {
            $vmt->handleJsonData($data, $type, $dest);
        }
    }    
    
    public function testHandleJsonDataFail()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'yaml',
            'yml',
            'php',
            'xml',
        );
        $dest = sys_get_temp_dir();
        $data = stripslashes($this->jsonClientData);
        
        foreach ($types as $type) {
            $this->setExpectedException('\InvalidArgumentException');
            $vmt->handleJsonData($data, $type, $dest);
        }
    }
    
    public function testParseJsonDataToArray()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'annotation'
        );
        
        foreach ($types as $type) {
            $this->assertEquals($this->parsedClientData, $this->invokeMethod($vmt, 'parseJsonDataToArray', array($this->clientData->entities, $this->clientData->relations, $type)));
        }
    }
    
    public function testParseJsonDataToArrayFail()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'yaml',
            'yml',
            'php',
            'xml',
        );
        
        foreach ($types as $type) {
            $this->setExpectedException('\InvalidArgumentException');
            
            $this->invokeMethod($vmt, 'parseJsonDataToArray', array($this->clientData->entities, $this->clientData->relations, $type));
        }
    }
    
    public function testParseDataArrayToMetadatas()
    {
        $vmt = new ViewToModelTransformer();
        
        $metadatas = $this->invokeMethod($vmt, 'parseDataArrayToMetadatas', array($this->parsedClientData));
        
        foreach ($metadatas as $metadata) {
            $this->assertInstanceOf('Doctrine\ORM\Mapping\ClassMetadataInfo', $metadata);
        }
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
    
    public function testGetExporterFail()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'yaml',
            'yml',
            'xml',
            'php',
        );
        $dir = __DIR__;
                
        foreach ($types as $type) {
            $this->setExpectedException('\InvalidArgumentException');
            
            $this->invokeMethod($vmt, 'getExporter', array($type, $dir));
        }
    }
    
    public function testGetModelTransformer()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'annotation' => 'Mst\Services\ModelTransformer\AnnotationModelTransformer',
        );
        
        foreach ($types as $type => $value) {
            $transformer = $this->invokeMethod($vmt, 'getModelTransformer', array($type));
            
            $this->assertInstanceOf($value, $transformer);
        }
    }
    
    public function testGetModelTransformerFail()
    {
        $vmt = new ViewToModelTransformer();
        
        $types = array(
            'yaml',
            'yml',
            'xml',
            'php',
        );
        
        foreach ($types as $type) {
            $this->setExpectedException('\InvalidArgumentException');
            
            $this->invokeMethod($vmt, 'getModelTransformer', array($type));
        }
    }
    
    public function testJsonDecode()
    {
        $vmt = new ViewToModelTransformer();
        
        $this->assertEquals($this->clientData, $this->invokeMethod($vmt, 'jsonDecode', array(stripslashes($this->jsonClientData))));
    }
}
