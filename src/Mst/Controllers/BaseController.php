<?php

namespace Mst\Controllers;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author javi
 */
abstract class BaseController
{
    /**
     * Return success response.
     * 
     * @param mixed $data
     * 
     * @return JsonResponse
     */
    public function returnJsonSuccessResponse($data)
    {
        return $this->returnJsonResponse(array('success' => true, 'data' => $data));
    }

    /**
     * Return not success response.
     * 
     * @param string $message
     * 
     * @return JsonResponse
     */
    public function returnJsonFailResponse($message)
    {
        return $this->returnJsonResponse(array('success' => false, 'message' => $message));
    }

    /**
     * Return JsonResponse.
     * 
     * @param array $data
     * 
     * @return JsonResponse
     */
    public function returnJsonResponse($data)
    {
        return new JsonResponse($data);
    }
}
