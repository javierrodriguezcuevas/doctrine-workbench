<?php

namespace App;

use Silex\Application as SilexApplication;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Mst\Controllers\BaseController;

class ControllerProvider extends BaseController implements ControllerProviderInterface
{
    /* @var SilexApplication */
    private $app;

    public function connect(SilexApplication $app)
    {
        $this->app = $app;

        $app->error([$this, 'error']);

        /** @var $controllers \Silex\ControllerCollection */
        $controllers = $app['controllers_factory'];

        $controllers
            ->get('/', array($this, 'indexAction'))
            ->bind('doctrine_workbench_index');

        $controllers
            ->get('/about', array($this, 'aboutAction'))
            ->bind('doctrine_workbench_about');

        $controllers
            ->post('/list-schemas', array($this, 'listAction'))
            ->bind('doctrine_workbench_list_schemas');

        $controllers
            ->post('/get-schema', array($this, 'getAction'))
            ->bind('doctrine_workbench_get_schema');

        $controllers
            ->post('/save', array($this, 'saveAction'))
            ->bind('doctrine_workbench_save');

        $controllers
            ->delete('/delete', array($this, 'deleteAction'))
            ->bind('doctrine_workbench_delete');

        $controllers
            ->post('/proccess', array($this, 'proccessAction'))
            ->bind('doctrine_workbench_proccess');

        return $controllers;
    }

    /**
     * Show index page.
     * 
     * @param \Silex\Application $app
     * 
     * @return Twig_Template
     */
    public function indexAction(Application $app)
    {
        return $app['twig']->render('index.twig', array(
            'footer_data' => $app['footer_data'],
        ));
    }

    /**
     * Show about page.
     * 
     * @param \Silex\Application $app
     * 
     * @return Twig_Template
     */
    public function aboutAction(Application $app)
    {
        return $app['twig']->render('about.twig', array(
            'footer_data' => $app['footer_data'],
        ));
    }

    /**
     * Show all schemas in database.
     * 
     * @param \Silex\Application $app
     * 
     * @return JsonResponse
     */
    public function listAction(Application $app)
    {
        try {
            $schemas = $app['schema.repository']->findAll();

            return $this->returnJsonSuccessResponse($schemas);
        } catch (\Exception $e) {
            return $this->returnJsonFailResponse($e->getMessage());
        }
    }

    /**
     * Get schema by id.
     * 
     * @param \Silex\Application                        $app
     * @param \Symfony\Component\HttpFoundation\Request $request
     * 
     * @return JsonResponse
     */
    public function getAction(Application $app, Request $request)
    {
        $content = $request->getContent();

        if ($app['schema.validator']->isValidJson($content)) {
            $contentData = json_decode($content);

            $schema = $app['schema.repository']->find($contentData->id);

            if (null != $schema) {
                return $this->returnJsonSuccessResponse($schema);
            }

            return $this->returnJsonFailResponse('Schema not found.');
        }

        return $this->returnJsonFailResponse('Error: format data.');
    }

    /**
     * Save the schema in database.
     * 
     * @param \Silex\Application                        $app
     * @param \Symfony\Component\HttpFoundation\Request $request
     * 
     * @return JsonResponse
     */
    public function saveAction(Application $app, Request $request)
    {
        $content = $request->getContent();

        if ($app['schema.validator']->isValidSaveData($content)) {
            $contentData = json_decode($content);

            $result = $app['schema.repository']->save(array(
                'name' => $contentData->name,
                'zoom' => $contentData->zoom,
                'schema' => json_encode($contentData->schema),
            ));

            if ($result > 0) {
                return $this->returnJsonSuccessResponse(array('message' => 'Schema saved.'));
            }

            return $this->returnJsonFailResponse('Error: schema not saved.');
        }

        return $this->returnJsonFailResponse('Error: format data.');
    }

    /**
     * Delete a schema by id.
     * 
     * @param \Silex\Application                        $app
     * @param \Symfony\Component\HttpFoundation\Request $request
     * 
     * @return JsonResponse
     */
    public function deleteAction(Application $app, Request $request)
    {
        $content = $request->getContent();

        if ($app['schema.validator']->isValidJson($content)) {
            $contentData = json_decode($content);
            $result = $app['schema.repository']->delete($contentData->id);

            if ($result) {
                return $this->returnJsonSuccessResponse(array('message' => 'Schema deleted.'));
            }

            return $this->returnJsonFailResponse('Error: schema not deleted.');
        }

        return $this->returnJsonFailResponse('Error: format data.');
    }

    /**
     * Proccess schema to Doctrine.
     * 
     * @param \Silex\Application                        $app
     * @param \Symfony\Component\HttpFoundation\Request $request
     * 
     * @return JsonResponse
     */
    public function proccessAction(Application $app, Request $request)
    {
        $dataJson = $request->getContent();

        if ($app['schema.validator']->isValidProccessData($dataJson)) {
            try {
                $uniqid = uniqid();
                $filepath = $this->app->getRootDir().'web'.DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR.$uniqid;
                
                $app['doctrine_transformer']->handleJsonData($dataJson, 'annotation', $filepath);

                if (false != $app['compressor_manager']->generateZip($filepath, $uniqid.'.zip')) {
                    return $this->returnJsonSuccessResponse(array(
                        'downloadUrl' => $request->getBasePath().'/temp/'.$uniqid.'/'.$uniqid.'.zip'
                    ));
                }

                return $this->returnJsonFailResponse('Error: generating zip.');
            } catch (\Exception $e) {
                return $this->returnJsonFailResponse($e->getMessage());
            }
        }

        return $this->returnJsonFailResponse('Error: format data.');
    }

    /**
     * Show error page.
     * 
     * @param \Exception $e
     * @param int        $code
     * 
     * @return mixed Response|JsonResponse
     */
    public function error(\Exception $e, $code)
    {
        if ('dev' === $this->app->getEnv()) {
            return;
        }

        switch ($code) {
            case 404:
                $message = 'The requested page could not be found.';
                break;
            default:
                $message = 'We are sorry, but something went terribly wrong.';
                break;
        }

        if ($this->app['request']->isXmlHttpRequest()) {
            return $this->returnJsonFailResponse('Error: code '.$code.'. Message: '.$message);
        }

        return new Response($message, $code);
    }
}
