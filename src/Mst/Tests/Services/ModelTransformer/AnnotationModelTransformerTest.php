<?php

namespace Mst\Services\ModelTransformer;

use Mst\Tests\Fixtures\AbstractBaseTest;
use Mst\Services\ModelTransformer\AnnotationModelTransformer;

/**
 * @author javi
 */
class AnnotationModelTransformerTest extends AbstractBaseTest
{        
    public function testGenerateFieldsMappings()
    {
        $amt = new AnnotationModelTransformer();
        
        $dataFields = array();
        foreach ($this->clientData->entities as $entity) {
            $dataFields[$entity->id] = $entity->fields;
        }
        
        foreach ($dataFields as $id => $fields) {
            $this->assertEquals($this->fieldsData[$id], $amt->generateFieldsMappings($fields));
        }
    }
        
    public function testGenerateAssociationMappings()
    {
        $amt = new AnnotationModelTransformer();
        
        $this->assertEquals($this->relationsData, $amt->generateAssociationMappings($this->clientData->entities, $this->clientData->relations));
    }
}
