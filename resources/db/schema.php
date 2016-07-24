<?php

$schema = new \Doctrine\DBAL\Schema\Schema();

$table = $schema->createTable('workbench_schema');
$table->addColumn('id', 'integer', array('unsigned' => true, 'autoincrement' => true));
$table->addColumn('name', 'string', array('length' => 50));
$table->addColumn('schema', 'text');
$table->addColumn('zoom', 'float', array('default' => 1));
$table->setPrimaryKey(array('id'));

return $schema;