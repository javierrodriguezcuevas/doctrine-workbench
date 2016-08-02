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
    /**
     * Map entities from json to models
     * 
     * @param string $jsonData
     * @param string $type
     * @param string $dest
     * 
     * @return void 
     */
    public function handleJsonData($jsonData, $type, $dest)
    {
        $exporter = $this->getExporter($type, $dest);
        $parsedData = $this->jsonDecode($jsonData);
        $parsedDataArray = $this->parseJsonDataToArray($parsedData->entities, $parsedData->relations);
        $metadatas = $this->parseDataArrayToMetadatas($parsedDataArray);

        $exporter->setMetadata($metadatas);
        $exporter->export();
    }
    
    /**
     * Parse stdObj entities from UI to an array of ClassMetadataInfo
     * 
     * @param array $entities
     * @param array $relations
     * 
     * @return array
     */
    protected function parseJsonDataToArray(array $entities, array $relations)
    {
        $result = array();
        
        $associationMappings = $this->generateAssociationMappings($entities, $relations);
        
        foreach ($entities as $entity) {
            $fieldsMappings = $this->generateFieldsMappings($entity->fields);
            $result[$entity->id] = array(
                'entityName' => $entity->entityName,
                'tableName' => $entity->tableName,
                'namespace' => $entity->namespace,
                'fieldMappings' => $fieldsMappings['fieldMappings'],
                'fieldNames' => $fieldsMappings['fieldNames'],
                'columnNames' => $fieldsMappings['columnNames'],
                'generatorType' => $fieldsMappings['generatorType'],
                'identifier' => $fieldsMappings['identifier'],
                'associationMappings' => array(),
            );
            
            foreach ($entity->relations as $relation) {
                $result[$entity->id]['associationMappings'][] = $associationMappings[$relation][$entity->id];
            }
        }
        
        return $result;
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
        foreach ($data as $entity) {
            $class = new ClassMetadataInfo($entity['namespace'].'\\'.$entity['entityName']);

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
     * Parse stdObj fields from UI to an array with fieldMappings
     * 
     * @param array $fields
     * 
     * @return array
     */
    protected function generateFieldsMappings(array $fields)
    {
        $result = array(
            'generatorType' => ClassMetadataInfo::GENERATOR_TYPE_NONE,
            'identifier' => array(),
        );
        
        foreach ($fields as $field) {
            if (sizeof($field->relations) === 0) {
                $fm = array(
                    'fieldName' => $field->name,
                    'columnName' => $field->tableName,
                    'type' => $field->type
                );

                $result['fieldNames'][$field->tableName] = $field->name;
                $result['columnNames'][$field->name] = $field->tableName;

                if ($field->pk) {
                    $result['generatorType'] = $this->getGeneratorType($field->strategy);
                    $fm['id'] = true;
                } else {
                    $fm['nullable'] = $field->nn;
                    $fm['length'] = $field->length;
                }

                $result['fieldMappings'][] = $fm;
            } else {
                $result['identifier'] = array($field->name);
            }
        }
        
        return $result;
    }

    /**
     * Parse stdObj relations from UI to an array with associationMappings
     * 
     * @param array $entities
     * @param array $relations
     * 
     * @return array
     */
    protected function generateAssociationMappings(array $entities, array $relations) 
    {
        $associationMappings = array();
        
        $entitiesNames = array();
        $fieldsNames = array();
        foreach ($entities as $entity) {
            $entitiesNames[$entity->id] = $entity->entityName;
            
            foreach ($entity->fields as $field) {
                $fieldsNames[$field->id] = $field->name;
            }
        }
        
        foreach ($relations as $relation) {
            $associationMappings[$relation->connectionId][$relation->sourceEntityId] = array(
                'fieldName' => $relation->sourceField->name,
                'targetEntity' => $entity->namespace.'\\'.$entitiesNames[$relation->targetEntityId],
                'mappedBy' => $fieldsNames[$relation->targetField->id],
                'cascade' => $relation->cascadeOptions,
                'type' => $this->getRelationType($relation->type, 'source'),
            );
            $associationMappings[$relation->connectionId][$relation->targetEntityId] = array(
                'fieldName' => $relation->targetField->name,
                'targetEntity' => $entity->namespace.'\\'.$entitiesNames[$relation->sourceEntityId],
                'inversedBy' => $fieldsNames[$relation->sourceField->id],
                'cascade' => $relation->cascadeOptions,
                'type' => $this->getRelationType($relation->type, 'target'),
                'joinColumns' => array(array(
                    'name' => $relation->targetField->tableName,
                    'referencedColumnName' => $fieldsNames[$relation->targetRelatedFieldId]
                ))
            );
            
            if (3 === $relation->type) {
                unset($associationMappings[$relation->connectionId][$relation->targetEntityId]['joinColumns']);
                $associationMappings[$relation->connectionId][$relation->sourceEntityId]['joinTable'] = array(
                    'name' => $relation->tableName,
                    'joinColumns' => array(
                        array(
                            'name' => $relation->targetField->tableName,
                            'referencedColumnName' => $fieldsNames[$relation->targetRelatedFieldId]
                        )
                    ),
                    'inverseJoinColumns' => array(
                        array(
                            'name' => $relation->sourceField->tableName,
                            'referencedColumnName' => $fieldsNames[$relation->sourceRelatedFieldId]
                        )
                    )
                );
            }
        }
        
        return $associationMappings;
    }
    
    /**
     * Gets an exporter driver instance.
     *
     * @param string      $type The type to get (yml, xml, etc.).
     * @param string|null $dest The directory where the exporter will export to.
     *
     * @return Driver\AbstractExporter
     *
     * @throws ExportException
     */
    protected function getExporter($type, $dest = null)
    {
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
     * Gets Doctrine relation type from UI relation type
     * 
     * @param int $type
     * 
     * @return int
     * 
     * @throws \Exception
     */
    protected function getRelationType($type, $entityDirection = null)
    {
        $types = array(
            1 => ClassMetadataInfo::ONE_TO_ONE,
            2 => array(
                'source' => ClassMetadataInfo::ONE_TO_MANY,
                'target' => ClassMetadataInfo::MANY_TO_ONE,
            ),
            3 => ClassMetadataInfo::MANY_TO_MANY,
        );
        
        if (!array_key_exists($type, $types)) {
            throw new \Exception('Invalid relation type.');
        }
        
        if (null !== $entityDirection && !in_array($entityDirection, array('source', 'target'))) {
            throw new \Exception('Invalid relation type OneToMany/ManyToOne.');
        }
        
        if (2 === $type && null !== $entityDirection) {
            return $types[$type][$entityDirection];
        }
        
        return $types[$type];
    }

    /**
     * Gets Doctrine generatotType from UI strategy
     * 
     * @param string $strategy
     * 
     * @return int
     */
    protected function getGeneratorType($strategy)
    {
        $types = array(
            'AUTO' => ClassMetadataInfo::GENERATOR_TYPE_AUTO
        );
        
        $result = ClassMetadataInfo::GENERATOR_TYPE_NONE;
        
        if (array_key_exists($strategy, $types)) {
            $result = $types[$strategy];
        }
        
        return $result;
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
        return json_decode($data);
    }
}