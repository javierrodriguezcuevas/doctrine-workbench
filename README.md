Doctrine Workbench
============================

This project is a testing application to learn AngularJS.
It can be use to create Doctine entities.

Installation
------------

> git clone https://github.com/javierrodriguezcuevas/doctrine-workbench

> cd doctrine-workbench

> docker-compose up

> composer install

> yarn install

> yarn run gulp

> bin/console doctrine:database:create

> bin/console doctrine:schema:load

> bin/console fixture:load

Tests
-----

>**PHP:**
> - phpunit --bootstrap src\Mst\Tests\bootstrap.php src\Mst\Tests

>**AngularJS**
> - yarn run gulp test

TODO
----
Write more tests.

Thanks to [Silex - Kitchen Sink Edition](https://github.com/lyrixx/Silex-Kitchen-Edition) ;
