<?php

namespace Mst\Services;

use Doctrine\DBAL\Connection;

/**
 * @author javi
 */
class SchemaRepository
{
    const TABLE_NAME = 'workbench_schema';
    /** @var Connection */
    protected $db;

    /**
     * @param Connection $db
     */
    public function __construct(Connection $db)
    {
        $this->db = $db;
    }

    /**
     * Find all rows.
     * 
     * @return array
     */
    public function findAll()
    {
        $sqlBase = 'SELECT id, name FROM %s';
        $sql = sprintf($sqlBase, $this->db->quoteIdentifier(self::TABLE_NAME));

        $statement = $this->db->executeQuery($sql);

        return $statement->fetchAll();
    }

    /**
     * Find one row by id.
     * 
     * @param int $id
     * 
     * @return mixed array or FALSE on failure.
     */
    public function find($id)
    {
        $sqlBase = 'SELECT * FROM %s WHERE %s = :id';
        $sql = sprintf($sqlBase,
            $this->db->quoteIdentifier(self::TABLE_NAME),
            $this->db->quoteIdentifier('id')
        );

        $statement = $this->db->executeQuery($sql, array(
            'id' => $id,
        ));

        return $statement->fetch();
    }

    /**
     * Save a row.
     * 
     * @param array $values
     * 
     * @return bool
     */
    public function save($values)
    {
        $sqlBase = 'INSERT INTO %s (%s, %s, %s) VALUES (:name, :schema, :zoom)';
        $sql = sprintf($sqlBase,
            $this->db->quoteIdentifier(self::TABLE_NAME),
            $this->db->quoteIdentifier('name'),
            $this->db->quoteIdentifier('schema'),
            $this->db->quoteIdentifier('zoom')
        );

        $result = $this->db->executeUpdate($sql, array(
            'name' => $values['name'],
            'schema' => $values['schema'],
            'zoom' => $values['zoom'],
        ));

        return $result;
    }

    /**
     * Remove a row by id.
     * 
     * @param int $id
     * 
     * @return bool
     */
    public function delete($id)
    {
        $sqlBase = 'DELETE FROM %s WHERE %s = :id';
        $sql = sprintf($sqlBase,
            $this->db->quoteIdentifier(self::TABLE_NAME),
            $this->db->quoteIdentifier('id')
        );

        $statement = $this->db->executeQuery($sql, array(
            'id' => $id,
        ));

        return $statement->execute();
    }
}
