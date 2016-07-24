<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class FieldRelation implements FieldInterface
{
    const FIELDS_OPTIONS_SEPARATOR = "\n\t * ";
    const FIELD_RELATION = <<<EOT
    /**
     * %relationoptions%
     */
    private $%fieldname%;
EOT;

    /** @var string */
    protected $name;
    /** @var string */
    protected $relationOptions;

    /**
     * @param string $name
     * @param string $relationOptions
     */
    public function __construct($name, $relationOptions)
    {
        Assert::stringNotEmpty($name);
        Assert::allIsInstanceOf($relationOptions, 'Mst\Models\RelationOptionsInterface');

        $this->name = $name;
        $this->relationOptions = $relationOptions;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getRelationOptions()
    {
        return $this->relationOptions;
    }

    public function __toString()
    {
        $relationOptions = implode(self::FIELDS_OPTIONS_SEPARATOR, $this->getRelationOptions());

        $result = str_replace(
            array('%relationoptions%', '%fieldname%'),
            array($relationOptions, $this->getName()),
            self::FIELD_RELATION
        ).PHP_EOL;

        return $result;
    }
}
