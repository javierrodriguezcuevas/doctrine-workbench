<?php

namespace App;

use Silex\Application as SilexApplication;
use Mst\Services\SchemaRepository;
use Mst\Services\CompressorManager;
use Mst\Services\Doctrine\DoctrineViewToModelTransformer;
use Mst\Services\Doctrine\DoctrineProcessator;
use Mst\Services\FileProcessator;
use Mst\Services\ViewDataValidator;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\TwigServiceProvider;

class Application extends SilexApplication 
{
    private $rootDir;
    private $env;
    
    public function __construct($env)
    {
        $this->rootDir = __DIR__.'/../../';
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

        $app['twig.path'] = array($this->rootDir.'src/App/templates', $this->rootDir.'src/Mst/Views');
        
        $app['schema.repository'] = new SchemaRepository($app['db']);
        
        $app['schema.validator'] = new ViewDataValidator();
        
        $app['file_processator'] = new FileProcessator();
        
        $app['doctrine_transformer'] = new DoctrineViewToModelTransformer();
        
        $app['doctrine_processator'] = new DoctrineProcessator();
        
        $app['compressor_manager'] = new CompressorManager();

        $app->mount('/', new ControllerProvider());
    }
    
    public function getRootDir()
    {
        return $this->rootDir;
    }
    
    public function getEnv()
    {
        return $this->env;
    }
}