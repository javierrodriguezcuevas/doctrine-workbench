<?php

// include the prod configuration
require __DIR__.'/config_prod.php';

$app['debug'] = true;

$app['db.options'] = array(
    'driver'        => 'pdo_mysql',
    'host'          => 'localhost',
    'port'          => 3306,
    'user'          => 'root',
    'password'      => null,
    'dbname'        => 'doctrinedesigner',
    'charset'       => 'utf8',
    'driverOptions' => array(1002 => 'SET NAMES utf8')
);