<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class TargetRelationOptions implements RelationOptionsInterface
{
    const TARGET_RELATION_OPTIONS = '@ORM\%name%(targetEntity="%targetEntity%", inversedBy="%inversedBy%")';
    
    /** @var string */
    private $name;
    /** @var string */
    private $targetEntity;
    /** @var string */
    private $inversedBy;

    /**
     * 
     * @param string $name
     * @param string $targetEntity
     * @param string $inversedBy
     */
    public function __construct($name, $targetEntity, $inversedBy)
    {
        Assert::stringNotEmpty($name);
        Assert::stringNotEmpty($targetEntity);
        Assert::stringNotEmpty($inversedBy);
        
        $this->name = $name;
        $this->targetEntity = $targetEntity;
        $this->inversedBy = $inversedBy;
    }
    
    public function __toString() 
    {
        return str_replace(
            array('%name%', '%targetEntity%', '%inversedBy%'), 
            array(
                $this->name,
                $this->targetEntity,
                $this->inversedBy
            ),
            self::TARGET_RELATION_OPTIONS
        );
    }
}
