<?php

namespace Mst\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author javi
 */
abstract class BaseController 
{
    /**
     * Return success response
     * @param array $data
     * @return Response
     */
    public function returnJsonSuccessResponse(array $data)
    {
        return $this->returnJsonResponse(array('success' => true, 'data' => $data));
    }

    /**
     * Return not success response
     * @param string $message
     * @return Response
     */
    public function returnJsonFailResponse($message)
    {
        return $this->returnJsonResponse(array('success' => false, 'message' => $message));
    }
    
    /**
     * Return JsonResponse
     * @param array $data
     * @return Response
     */
    public function returnJsonResponse($data)
    {
        return new JsonResponse($data);
    }
}