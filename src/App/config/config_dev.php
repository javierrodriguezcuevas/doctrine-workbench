<?php

// include the prod configuration
require __DIR__.'/config_prod.php';

$app['debug'] = true;

$app['db.options'] = array(
    'driver' => 'pdo_mysql',
    'host' => 'localhost',
    'port' => 3306,
    'user' => 'root',
    'password' => null,
    'dbname' => 'doctrinedesigner',
    'charset' => 'utf8',
    'driverOptions' => array(1002 => 'SET NAMES utf8'),
);

$app['orm.em.options'] = array(
    'mappings' => array(
        array(
            'type' => 'annotation',
            'namespace' => 'Mst\Entity',
            'path' => __DIR__.'/../../Mst/Entity',
            'use_simple_annotation_reader' => false,
        ),
    )
);
