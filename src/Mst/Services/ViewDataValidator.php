<?php

namespace Mst\Services;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class ViewDataValidator
{
    /**
     * Validate schema format.
     * 
     * @param string $jsonData
     * 
     * @return bool
     */
    public function isValidJson($jsonData)
    {
        Assert::stringNotEmpty($jsonData);

        $data = json_decode($jsonData);

        return null !== $data && is_object($data) && property_exists($data, 'id');
    }

    /**
     * Validate schema.
     * 
     * @param string $jsonData
     * 
     * @return bool
     */
    public function isValidSaveData($jsonData)
    {
        $data = json_decode($jsonData, true);

        if (null === $data || !is_array($data)) {
            return false;
        }

        $validateData = array_intersect_key($data, array(
            'name' => '',
            'zoom' => '',
            'schema' => array(
                'entities' => array(),
                'relations' => array(),
            ),
        ));

        return $validateData['name'] != '' && $this->isValidProccessData(json_encode($validateData['schema']));
    }

    /**
     * Validate schema to be proccessed.
     * 
     * @param string $jsonData
     * 
     * @return bool
     */
    public function isValidProccessData($jsonData)
    {
        $data = json_decode($jsonData, true);

        if (null === $data || !is_array($data)) {
            return false;
        }

        $validateData = array_intersect_key($data, array(
            'entities' => array(),
            'relations' => array(),
        ));

        return sizeof($validateData['entities']) > 0 && sizeof($validateData['relations'] > 0);
    }
}
