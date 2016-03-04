<?php

namespace Mst\Services\Doctrine;

use Mst\Models\Entity;
use Mst\Models\Field;
use Mst\Models\FieldPk;
use Mst\Models\FieldRelation;
use Mst\Models\SourceRelationOptions;
use Mst\Models\TargetRelationOptions;
use Mst\Models\TargetRelationJoinOptions;
use Mst\Models\SourceManyRelationOptions;
use Mst\Models\SourceManyRelationJoinOptions;

/**
 * @author javi
 */
class DoctrineViewToModelTransformer
{
    /**
     * Map entities from json to models
     * @param string $jsonData
     * @return array 
     */
    public function handleJsonData($jsonData)
    {
        $parsedData = json_decode($jsonData);
        
        $parsedRelations = $this->parseRelations($parsedData->entities, $parsedData->relations);

        // replace relations fields in entities with relation fields in $parsedRelations
        // TODO: improve this
        foreach ($parsedRelations as $r) {
            
            $sourceEntity = $this->getElementById($parsedData->entities, $r['sourceEntityId']);
            $targetEntity = $this->getElementById($parsedData->entities, $r['targetEntityId']);
            
            // replace field in source
            for ($i = 0, $len = count($sourceEntity->fields), $exit = false; $i < $len && !$exit; $i++) {
                if ($sourceEntity->fields[$i]->id == $r['sourceField']->id) {
                    $sourceEntity->fields[$i] = $r['sourceField'];
                    $exit = true;
                }
            }

            // replace field in target
            for ($i = 0, $len = count($targetEntity->fields), $exit = false; $i < $len && !$exit; $i++) {
                if ($targetEntity->fields[$i]->id == $r['targetField']->id) {
                    $targetEntity->fields[$i] = $r['targetField'];
                    $exit = true;
                }
            }
        }
        
        $entities = $this->parseEntities($parsedData->entities);
        
        return $entities;
    }
    
    private function parseEntities($entities) 
    {    
        $result = array();
        
        foreach ($entities as $entity) {
            $result[] = new Entity(
                $entity->entityName, 
                $entity->tableName, 
                $entity->namespace, 
                $this->parseFields($entity->fields)
            );
        }

        return $result;
    }
    
    private function parseFields($fields)
    {
        $result = array();
        
        foreach ($fields as $field) {
            if ($field->pk) {
                $result[] = new FieldPk($field->name, $field->type, $field->tableName, $field->strategy);
            } elseif (property_exists($field, 'relationOptions')) {
                $result[] = new FieldRelation($field->name, $field->relationOptions);
            } else {
                $result[] = new Field($field->name, $field->type, $field->tableName, $field->length, $field->nn);
            }
        }
        
        return $result;
    }
    
    private function parseRelations($jsonEntities, $jsonRelations)
    {
        $result = array();
        
        foreach ($jsonRelations as $r) {
            $sourceEntity = $this->getElementById($jsonEntities, $r->sourceEntityId);
            $targetEntity = $this->getElementById($jsonEntities, $r->targetEntityId);
            
            $entities = array(
                'sourceEntityId' => $sourceEntity->id,
                'targetEntityId' => $targetEntity->id,
            );
            
            $relationFields = array();
            
            if ($r->type == 1) {
                $relationFields = $this->parseOneToOne($r, $sourceEntity, $targetEntity);
            } elseif ($r->type == 2) {
                $relationFields = $this->parseOneToMany($r, $sourceEntity, $targetEntity);
            } elseif ($r->type == 3) {
                $relationFields = $this->parseManyToMany($r, $sourceEntity, $targetEntity);
            }
            
            $result[] = array_merge($entities, $relationFields);
        }
        
        return $result;
    }
    
    private function parseOneToOne($relation, $sourceEntity, $targetEntity)
    {
        $sourceRelationOptions = new SourceRelationOptions(
            'OneToOne',
            $targetEntity->namespace . "\\" . $targetEntity->entityName,
            $relation->targetField->name,
            $relation->cascadeOptions
        );
        
        $targetFieldName = $this->getElementById($targetEntity->fields, $relation->targetRelatedFieldId);
        $targetRelationOptions = new TargetRelationOptions(
            'OneToOne', 
            $sourceEntity->namespace . "\\" . $sourceEntity->entityName, 
            $relation->sourceField->name
        );
        $targetRelationJoinOptions = new TargetRelationJoinOptions(
            $relation->targetField->tableName,
            $targetFieldName->name
        );
        
        $relation->sourceField->relationOptions = array($sourceRelationOptions);
        $relation->targetField->relationOptions = array($targetRelationOptions, $targetRelationJoinOptions);
        
        return array(
            'sourceField' => $relation->sourceField,
            'targetField' => $relation->targetField
        );
    }
    
    private function parseOneToMany($relation, $sourceEntity, $targetEntity)
    {
        $sourceRelationOptions = new SourceRelationOptions(
            'OneToMany',
            $targetEntity->namespace . "\\" . $targetEntity->entityName,
            $relation->targetField->name,
            $relation->cascadeOptions
        );
        
        $targetFieldName = $this->getElementById($targetEntity->fields, $relation->targetRelatedFieldId);
        $targetRelationOptions = new TargetRelationOptions(
            'ManyToOne', 
            $sourceEntity->namespace . "\\" . $sourceEntity->entityName, 
            $relation->sourceField->name
        );        
        $targetRelationJoinOptions = new TargetRelationJoinOptions(
            $relation->targetField->tableName,
            $targetFieldName->name
        );
        
        $relation->sourceField->relationOptions = array($sourceRelationOptions);
        $relation->targetField->relationOptions = array($targetRelationOptions, $targetRelationJoinOptions);
        
        return array(
            'sourceField' => $relation->sourceField,
            'targetField' => $relation->targetField
        );
    }
    
    private function parseManyToMany($relation, $sourceEntity, $targetEntity)
    {
        $sourceFieldName = $this->getElementById($targetEntity->fields, $relation->targetRelatedFieldId);
        $targetFieldName = $this->getElementById($sourceEntity->fields, $relation->sourceRelatedFieldId);

        $sourceRelationOptions = new SourceManyRelationOptions(
            'ManyToMany',
            $sourceEntity->namespace . "\\" . $sourceEntity->entityName,
            $relation->sourceField->name,
            $relation->cascadeOptions
        );
        $sourceRelationJoinOptions = new SourceManyRelationJoinOptions(
            $relation->tableName,
            $relation->targetField->tableName,
            $sourceFieldName->name,
            $relation->sourceField->tableName,
            $targetFieldName->name
        );

        $targetRelationOptions = new TargetRelationOptions(
            'ManyToMany',
            $sourceEntity->namespace . "\\" . $sourceEntity->entityName,
            $relation->targetField->name,
            array()
        );
        
        $relation->sourceField->relationOptions = array($sourceRelationOptions, $sourceRelationJoinOptions);
        $relation->targetField->relationOptions = array($targetRelationOptions);
        
        return array(
            'sourceField' => $relation->sourceField,
            'targetField' => $relation->targetField
        );
    }
    
    /**
     * Find element from an array of stdObj by its id column
     * @param array $jsonElements
     * @param integer $id
     * @return Field $result
     */
    private function getElementById(array $jsonElements, $id)
    {
        $result = null;
        
        for ($i = 0, $len = count($jsonElements); $i < $len && $result == null; $i++) {
            if ($jsonElements[$i]->id == $id) {
                $result = $jsonElements[$i];
            }
        }

        return $result;
    }
}