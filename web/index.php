<?php

require_once __DIR__.'/../vendor/autoload.php';

use App\Application;

$app = new Application('prod');

$app->run();

return $app;