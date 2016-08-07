<?php

namespace Mst\Services;

use Doctrine\ORM\EntityManager;
use Mst\Entity\WorkbenchSchema;
use Mst\Models\SchemaRepository as SchemaRepositoryInterface;

/**
 * @author javi
 */
class SchemaRepository implements SchemaRepositoryInterface
{
    /** @var EntityManager */
    protected $em;
    
    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * Find all WorkbenchSchemas
     * 
     * @return array
     */
    public function findAll()
    {
        return $this->em->getRepository('Mst\Entity\WorkbenchSchema')->findAll();
    }

    /**
     * Find one WorkbenchSchema by id
     * 
     * @param integer $id
     * 
     * @return mixed WorkbenchSchema or false on failure.
     */
    public function find($id)
    {
        $result = $this->em->getRepository('Mst\Entity\WorkbenchSchema')->find($id);
        
        return (null === $result) ? false : $result;
    }

    /**
     * Save a WorkbenchSchema
     * 
     * @param WorkbenchSchema $entity
     * 
     * @return bool
     */
    public function save(WorkbenchSchema $entity)
    {
        $result = false;

        try {
            $this->em->persist($entity);
            $this->em->flush($entity);
            
            $result = true;
        } catch (\Exception $e) {
            
        }
        
        return $result;
    }

    /**
     * Remove a WorkbenchSchema by id
     * 
     * @param integer $id
     * 
     * @return bool
     */
    public function delete($id)
    {
        $result = false;
        
        try {
            $entity = $this->find($id);
            
            if (null !== $entity) {
                $this->em->remove($entity);
                $this->em->flush($entity);
            
                $result = true;
            }
        } catch (\Exception $e) {
            
        }
        
        return $result;
    }
}
