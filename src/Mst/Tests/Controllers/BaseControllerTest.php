<?php

namespace Mst\Tests\Services;

/**
 * @author javi
 */
class BaseControllerTest extends \PHPUnit_Framework_TestCase
{    
    public function testReturnJsonSuccess()
    {
        $cm = $this->getMockBuilder('Mst\Controllers\BaseController')
            ->setMethods(null)
            ->getMock();
        
        $response = $cm->returnJsonSuccessResponse(array('test'));

        $this->assertInstanceOf('Symfony\Component\HttpFoundation\Response', $response);
        $this->assertEquals(200, $response->getStatusCode());
        
        $content = json_decode($response->getContent());

        $this->assertInstanceOf('stdClass', $content);
        $this->assertObjectHasAttribute('success', $content);
        $this->assertObjectHasAttribute('data', $content);
        $this->assertTrue($content->success);
        
        $this->assertNotEmpty($content->data);
        $this->assertEquals('test', $content->data[0]);
    }
    
    public function testReturnJsonFail()
    {
        $cm = $this->getMockBuilder('Mst\Controllers\BaseController')
            ->setMethods(null)
            ->getMock();
        
        $response = $cm->returnJsonFailResponse('test');

        $this->assertInstanceOf('Symfony\Component\HttpFoundation\Response', $response);
        $this->assertEquals(200, $response->getStatusCode());
        
        $content = json_decode($response->getContent());

        $this->assertInstanceOf('stdClass', $content);
        $this->assertObjectHasAttribute('success', $content);
        $this->assertObjectHasAttribute('message', $content);
        $this->assertFalse($content->success);
        $this->assertEquals('test', $content->message);
    }
}
