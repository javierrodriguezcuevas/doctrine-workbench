Doctrine Workbench
============================

This project is a testing application to learn AngularJS.
It can be use to create Doctine entities.

Installation
------------

> git clone https://github.com/javierrodriguezcuevas/doctrine-workbench

> cd doctrine-workbench

> composer install

> npm install

> grunt

> bin/console doctrine:database:create

> bin/console doctrine:schema:load

> bin/console fixture:load

Tests
-----

>**PHP:**
> - phpunit --bootstrap src\Mst\Tests\bootstrap.php src\Mst\Tests

>**AngularJS**
> - grunt test

TODO
----
Write more tests.

Thanks to [Silex - Kitchen Sink Edition](https://github.com/lyrixx/Silex-Kitchen-Edition) ;