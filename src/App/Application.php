<?php

namespace App;

use Silex\Application as SilexApplication;
use Mst\Services\SchemaRepository;
use Mst\Services\ViewToModelTransformer;
use Mst\Services\ViewDataValidator;
use Mst\Utils\CompressorManager;
use Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\TwigServiceProvider;

class Application extends SilexApplication
{
    /** @var string */
    private $rootDir;
    /** @var string */
    private $env;

    /**
     * @param string $env
     * 
     * @throws \RuntimeException
     */
    public function __construct($env)
    {
        $this->rootDir = realpath(__DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..').DIRECTORY_SEPARATOR;
        $this->env = $env;

        parent::__construct();

        $app = $this;

        $configFile = sprintf('%s/src/App/config/config_%s.php', $this->rootDir, $env);
        if (!file_exists($configFile)) {
            throw new \RuntimeException(sprintf('The file "%s" does not exists.', $configFile));
        }
        require $configFile;

        $app->register(new DoctrineServiceProvider());
        $app->register(new ServiceControllerServiceProvider());
        $app->register(new UrlGeneratorServiceProvider());
        $app->register(new TwigServiceProvider());
        $app->register(new DoctrineOrmServiceProvider());

        $app['twig.path'] = array($this->rootDir.'src/App/templates', $this->rootDir.'src/Mst/Views');
        $app['schema.repository'] = new SchemaRepository($app['orm.em']);
        $app['schema.validator'] = new ViewDataValidator();
        $app['doctrine_transformer'] = new ViewToModelTransformer();
        $app['compressor_manager'] = new CompressorManager();

        $app->mount('/', new ControllerProvider());
    }

    /**
     * @return string $rootDir
     */
    public function getRootDir()
    {
        return $this->rootDir;
    }

    /**
     * @return string $env
     */
    public function getEnv()
    {
        return $this->env;
    }
}
