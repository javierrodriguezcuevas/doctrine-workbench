<?php

namespace Mst\Services\Doctrine;

use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class DoctrineProcessator
{    
    const FILE_HEADER = <<<EOT
<?php 
 
namespace %namespace%;

use Doctrine\ORM\Mapping as ORM;

%entity%
EOT;
    
    /**
     * Generate files from entities
     * @param array $content
     * @return array $fileContents
     * @throws InvalidArgumentException
     */
    public function generateFiles(array $content) 
    {
        Assert::allIsInstanceOf($content, 'Mst\Models\Entity');
        
        $filesContents = array();

        foreach ($content as $entity) {
            $filesContents[$entity->getEntityName()] = str_replace(
                array('%namespace%', '%entity%'),
                array($entity->getNamespace(), (string) $entity),
                self::FILE_HEADER
            );
        }
        
        return $filesContents;
    }
}