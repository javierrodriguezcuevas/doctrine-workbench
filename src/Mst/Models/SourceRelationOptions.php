<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class SourceRelationOptions implements RelationOptionsInterface
{
    const SOURCE_RELATION_OPTIONS = '@ORM\%name%(targetEntity="%targetEntity%", mappedBy="%mappedBy%"%cascade%)';

    /** @var string */
    private $name;
    /** @var string */
    private $targetEntity;
    /** @var string */
    private $mappedBy;
    /** @var string */
    private $cascade;

    /**
     * @param string $name
     * @param string $targetEntity
     * @param string $mappedBy
     * @param array  $cascade
     */
    public function __construct($name, $targetEntity, $mappedBy, array $cascade)
    {
        Assert::stringNotEmpty($name);
        Assert::stringNotEmpty($targetEntity);
        Assert::stringNotEmpty($mappedBy);

        $this->name = $name;
        $this->targetEntity = $targetEntity;
        $this->mappedBy = $mappedBy;
        $this->cascade = $cascade;
    }

    public function __toString()
    {
        $result = array();
        foreach ($this->cascade as $o) {
            $result[] = $o->id;
        }

        $cascade = (sizeof($this->cascade) > 0) ? ', cascade={"'.implode('","', $result).'"}' : '';

        return str_replace(
            array('%name%', '%targetEntity%', '%mappedBy%', '%cascade%'),
            array(
                $this->name,
                $this->targetEntity,
                $this->mappedBy,
                $cascade,
            ),
            self::SOURCE_RELATION_OPTIONS
        );
    }
}
