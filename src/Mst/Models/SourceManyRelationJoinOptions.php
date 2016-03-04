<?php

namespace Mst\Models;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class SourceManyRelationJoinOptions implements RelationOptionsInterface
{
    const SOURCE_RELATION_JOIN_OPTIONS = '@ORM\JoinTable(name="%tablename%", joinColumns={@ORM\JoinColumn(name="%targetFieldKeyName%", referencedColumnName="%sourceFieldName%")}, inverseJoinColumns={@ORM\JoinColumn(name="%sourceFieldKeyName%", referencedColumnName="%targetFieldName%")})';
    
    /** @var string */
    private $tablename;
    /** @var string */
    private $targetFieldKeyName;
    /** @var string */
    private $sourceFieldName;
    /** @var string */
    private $sourceFieldKeyName;
    /** @var string */
    private $targetFieldName;
    
    /**
     * 
     * @param string $tablename
     * @param string $targetFieldKeyName
     * @param string $sourceFieldName
     * @param string $sourceFieldKeyName
     * @param string $targetFieldName
     */
    public function __construct($tablename, $targetFieldKeyName, $sourceFieldName, $sourceFieldKeyName, $targetFieldName)
    {
        Assert::stringNotEmpty($tablename);
        Assert::stringNotEmpty($targetFieldKeyName);
        Assert::stringNotEmpty($sourceFieldName);
        Assert::stringNotEmpty($sourceFieldKeyName);
        Assert::stringNotEmpty($targetFieldName);
        
        $this->tablename = $tablename;
        $this->targetFieldKeyName = $targetFieldKeyName;
        $this->sourceFieldName = $sourceFieldName;
        $this->sourceFieldKeyName = $sourceFieldKeyName;
        $this->targetFieldName = $targetFieldName;
    }
    
    public function __toString() 
    {
        return str_replace(
            array('%tablename%', '%targetFieldKeyName%', '%sourceFieldName%', '%sourceFieldKeyName%', '%targetFieldName%'), 
            array(
                $this->tablename,
                $this->targetFieldKeyName,
                $this->sourceFieldName,
                $this->sourceFieldKeyName,
                $this->targetFieldName
            ),
            self::SOURCE_RELATION_JOIN_OPTIONS
        );
    }
}
