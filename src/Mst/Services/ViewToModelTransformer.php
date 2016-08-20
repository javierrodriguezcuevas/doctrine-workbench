<?php

namespace Mst\Services;

use Doctrine\ORM\Mapping\ClassMetadataInfo;
use Doctrine\ORM\Tools\EntityGenerator;
use Doctrine\ORM\Tools\Export\ClassMetadataExporter;

/**
 * @author javi
 */
class ViewToModelTransformer
{    
    /** @var array */
    public static $_supportedExports = array(
        'annotation',
        // Not implemented yet
        //'yaml',
        //'yml',
    );
    
    /**
     * Map entities from json to models
     * 
     * @param string $jsonData
     * @param string $type
     * @param string $dest
     * 
     * @return $metadatas
     */
    public function handleJsonData($jsonData)
    {
        $parsedData = $this->jsonDecode($jsonData);
        
        return $this->parseDataArrayToMetadatas($parsedData);       
    }
    
    /**
     * Export metadatas to files
     * 
     * @param type $metadatas
     * @param type $type
     * @param type $dest
     * 
     * @return void
     * 
     * @throws ExportException
     */
    public function export($metadatas, $type, $dest)
    {
        $exporter = $this->getExporter($type, $dest);
        $exporter->setMetadata($metadatas);
        $exporter->export();
    }
    
    /**
     * Parse array data to an array of ClassMetadataInfo
     * 
     * @param array $data
     * 
     * @return ClassMetadataInfo
     */
    protected function parseDataArrayToMetadatas(array $data)
    {
        $result = array();
        
        foreach ($data['entities'] as $entity) {
            $class = new ClassMetadataInfo($entity['namespace'].'\\'.$entity['name']);

            $class->table = $entity['tableName'];
            $class->fieldMappings = $entity['fieldMappings'];
            $class->fieldNames = $entity['fieldNames'];
            $class->columnNames = $entity['columnNames'];
            $class->identifier = $entity['identifier'];
            $class->generatorType = $entity['generatorType'];
            $class->associationMappings = $entity['associationMappings'];
            
            $result[] = $class;
        }
        
        return $result;
    }

    /**
     * Gets an exporter driver instance.
     *
     * @param string      $type The type to get (annotation, yaml, yml, xml, php). Actually only annotation is supported.
     * @param string|null $dest The directory where the exporter will export to.
     *
     * @return Driver\AbstractExporter
     *
     * @throws ExportException
     */
    protected function getExporter($type, $dest = null)
    {
        if (!in_array($type, self::$_supportedExports)) {
            throw new \InvalidArgumentException("Unsuported Exporter type: '$type'.");
        }
        
        $cme = new ClassMetadataExporter();
        $exporter = $cme->getExporter($type, $dest);
        $exporter->setOverwriteExistingFiles(true);
        
        if ('annotation' === $type) {
            $entityGenerator = new EntityGenerator();
            $entityGenerator->setGenerateAnnotations(false);
            $entityGenerator->setGenerateStubMethods(true);
            $entityGenerator->setRegenerateEntityIfExists(false);
            $entityGenerator->setUpdateEntityIfExists(true);
            $entityGenerator->setNumSpaces(4);
            $entityGenerator->setAnnotationPrefix('ORM\\');
            
            $exporter->setEntityGenerator($entityGenerator);
        }
        
        return $exporter;
    }
    
    /**
     * Converts a json string to a stdObj
     * 
     * @param string $data
     * 
     * @return stdObj
     */
    protected function jsonDecode($data)
    {
        return json_decode($data, true);
    }
}