<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class TargetRelationJoinOptions implements RelationOptionsInterface
{
    const TARGET_RELATION_JOIN_OPTIONS = '@ORM\JoinColumn(name="%joinColumnName%", referencedColumnName="%referencedColumnName%")';

    /** @var string */
    private $joinColumnName;
    /** @var string */
    private $referencedColumnName;

    /**
     * @param string $joinColumnName
     * @param string $referencedColumnName
     */
    public function __construct($joinColumnName, $referencedColumnName)
    {
        Assert::stringNotEmpty($joinColumnName);
        Assert::stringNotEmpty($referencedColumnName);

        $this->joinColumnName = $joinColumnName;
        $this->referencedColumnName = $referencedColumnName;
    }

    public function __toString()
    {
        return str_replace(
            array('%joinColumnName%', '%referencedColumnName%'),
            array(
                $this->joinColumnName,
                $this->referencedColumnName,
            ),
            self::TARGET_RELATION_JOIN_OPTIONS
        );
    }
}
