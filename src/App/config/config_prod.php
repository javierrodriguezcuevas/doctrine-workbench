<?php

$app['footer_data'] = 'v0.1';

$app['db.options'] = array(
    'driver' => 'pdo_mysql',
    'host' => getenv('OPENSHIFT_MYSQL_DB_HOST'),
    'port' => getenv('OPENSHIFT_MYSQL_DB_PORT'),
    'user' => getenv('OPENSHIFT_MYSQL_DB_USERNAME'),
    'password' => getenv('OPENSHIFT_MYSQL_DB_PASSWORD'),
    'dbname' => getenv('OPENSHIFT_APP_NAME'),
    'charset' => 'utf8',
    'driverOptions' => array(1002 => 'SET NAMES utf8'),
);
