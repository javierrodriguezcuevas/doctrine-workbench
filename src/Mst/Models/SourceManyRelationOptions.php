<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class SourceManyRelationOptions implements RelationOptionsInterface
{
    const SOURCE_RELATION_OPTIONS = '@ORM\%name%(targetEntity="%targetEntity%", inversedBy="%inversedBy%"%cascade%)';
    
    /** @var string */
    private $name;
    /** @var string */
    private $targetEntity;
    /** @var string */
    private $inversedBy;
    /** @var array */
    private $cascade;

    /**
     * 
     * @param string $name
     * @param string $targetEntity
     * @param string $inversedBy
     * @param array $cascade
     */
    public function __construct($name, $targetEntity, $inversedBy, array $cascade)
    {
        Assert::stringNotEmpty($name);
        Assert::stringNotEmpty($targetEntity);
        Assert::stringNotEmpty($inversedBy);
        
        $this->name = $name;
        $this->targetEntity = $targetEntity;
        $this->inversedBy = $inversedBy;
        $this->cascade = $cascade;
    }
    
    public function __toString() 
    {
        $result = array();
        foreach ($this->cascade as $o) {
            $result[] = $o->id;
        }
        
        $cascade = (sizeof($this->cascade) > 0) ? ', cascade={"' . implode('","', $result) . '"}' : '';
        
        return str_replace(
            array('%name%', '%targetEntity%', '%inversedBy%', '%cascade%'), 
            array(
                $this->name,
                $this->targetEntity,
                $this->inversedBy,
                $cascade
            ),
            self::SOURCE_RELATION_OPTIONS
        );
    }
}
