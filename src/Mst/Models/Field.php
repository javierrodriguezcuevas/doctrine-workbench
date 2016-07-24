<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class Field implements FieldInterface
{
    const FIELD = <<<EOT
    /**
     * @ORM\Column(name="%tablename%", type="%fieldtype%"%length%%nullable%)
     */
    private $%fieldname%; 
EOT;

    /** @var string */
    protected $name;
    /** @var string */
    protected $type;
    /** @var string */
    protected $tableName;
    /** @var int */
    protected $length;
    /** @var bool */
    protected $isNotNull;

    /**
     * @param string $name
     * @param string $type
     * @param string $tableName
     * @param int    $length
     * @param bool   $isNotNull
     */
    public function __construct($name, $type, $tableName, $length, $isNotNull)
    {
        Assert::stringNotEmpty($name);
        Assert::oneOf($type, array(
            'smallint',
            'integer',
            'bigint',
            'decimal',
            'float',
            'string',
            'text',
            'boolean',
            'date',
            'datetime',
            'time',
        ));
        Assert::stringNotEmpty($tableName);
        Assert::integer($length);
        Assert::boolean($isNotNull);

        $this->name = $name;
        $this->type = $type;
        $this->tableName = $tableName;
        $this->length = $length;
        $this->isNotNull = $isNotNull;
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

    public function getLength()
    {
        return $this->length;
    }

    public function getIsNotNull()
    {
        return $this->isNotNull;
    }

    public function __toString()
    {
        $length = ($this->getLength() > 0) ? ', length='.$this->getLength() : '';
        $nullValue = ($this->getIsNotNull()) ? 'true' : 'false';
        $nullable = ', nullable='.$nullValue;

        $result = str_replace(
            array('%fieldname%', '%tablename%', '%fieldtype%', '%length%', '%nullable%'),
            array($this->getName(), $this->getTableName(), $this->getType(), $length, $nullable),
            self::FIELD
        ).PHP_EOL;

        return $result;
    }
}
