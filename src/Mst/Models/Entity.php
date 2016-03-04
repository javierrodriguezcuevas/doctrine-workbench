<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class Entity
{
    const ENTITY_HEADER = <<<EOT
/**
 * @ORM\Table(name="%tablename%")
 * @ORM\Entity
 */
class %entityname% 
{
%fields%           
}
EOT;
    
    /** @var string */
    protected $entityName;
    /** @var string */
    protected $tableName;
    /** @var string */
    protected $namespace;
    /** @var array */
    protected $fields;

    /**
     * 
     * @param string $entityName
     * @param string $tableName
     * @param string $namespace
     * @param string $fields
     */
    public function __construct($entityName, $tableName, $namespace, array $fields) 
    {
        Assert::stringNotEmpty($entityName);
        Assert::stringNotEmpty($tableName);
        Assert::stringNotEmpty($namespace);
        Assert::allIsInstanceOf($fields, 'Mst\Models\FieldInterface');
        
        $this->entityName = $entityName;
        $this->tableName = $tableName;
        $this->namespace = $namespace;
        $this->fields = $fields;
    }
    
    public function getEntityName()
    {
        return $this->entityName;
    }

    public function setEntityName($entityName)
    {
        $this->entityName = $entityName;
    }

    public function getTableName()
    {
        return $this->tableName;
    }

    public function setTableName($tableName) 
    {
        $this->tableName = $tableName;
    }

    public function getFields()
    {
        return $this->fields;
    }

    public function setFields($fields) 
    {
        $this->fields = $fields;
    }

    public function getNamespace() 
    {
        return $this->namespace;
    }

    public function setNamespace($namespace) 
    {
        $this->namespace = $namespace;
    }
    
    public function __toString()
    {
        $fields = '';
        foreach ($this->getFields() as $field) {
            $fields .= (string) $field;
        }
        
        $result = str_replace(
            array('%tablename%', '%entityname%', '%fields%'), 
            array($this->getTableName(), $this->getEntityName(), $fields),
            self::ENTITY_HEADER
        );

        return $result;
    }
}
