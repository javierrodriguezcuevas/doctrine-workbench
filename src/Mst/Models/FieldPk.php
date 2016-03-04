<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class FieldPk implements FieldInterface 
{
    const FIELD_ID = <<<EOT
    /**
     * @ORM\Column(name="%tablename%", type="%fieldtype%")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="%strategy%")
     */
    private $%fieldname%;
EOT;
    
    /** @var string */
    protected $name;
    /** @var string */
    protected $type;
    /** @var string */
    protected $tableName;
    /** @var string */
    protected $strategy;
    
    /**
     * 
     * @param string $name
     * @param string $type
     * @param string $tableName
     * @param string $strategy
     */
    public function __construct($name, $type, $tableName, $strategy)
    {
        Assert::stringNotEmpty($name);
        Assert::oneOf($type, array(
            'smallint',
            'integer',
            'bigint'
        ));
        Assert::stringNotEmpty($tableName);
        Assert::oneOf($strategy, array(
            'AUTO',
            'SEQUENCE',
            'TABLE',
            'IDENTITY',
            'UUID',
            'NONE'
        ));
        $this->name = $name;
        $this->type = $type;
        $this->tableName = $tableName;
        $this->strategy = $strategy;
    }
    
    public function getName()
    {
        return $this->name;
    }

    public function getType()
    {
        return $this->type;
    }
    
    public function getTableName()
    {
        return $this->tableName;
    }
    
    public function getStrategy()
    {
        return $this->strategy;
    }
    
    public function __toString() 
    {
        $result = str_replace(
            array('%fieldname%', '%tablename%', '%fieldtype%', '%strategy%'), 
            array($this->getName(), $this->getTableName(), $this->getType(), $this->getStrategy()), 
            self::FIELD_ID
        ) . PHP_EOL;

        return $result;
    }
}
