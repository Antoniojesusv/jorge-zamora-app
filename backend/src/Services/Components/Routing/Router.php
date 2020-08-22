<?php

namespace App\Services\Components\Routing;

use App\Services\Components\Routing\Exceptions\VariablePathNotFoundException;
use App\Services\Components\Routing\Interfaces\RequestInterface;
use Error;

class Router
{
    private $request;
    private $http;
    private $namespaceControllers;

    public function __construct(RequestInterface $request, HttpService $http)
    {
        $this->request = $request;
        $this->http = $http;
        $this->pathMapCollection = [
            '/' => 'index',
            '/id' => 'getAction',
            'filter' => 'getFilterAction',
            'post' => 'createAction',
            'put' => 'updateAction',
            'delete' => 'deleteAction'
        ];
        $this->namespaceControllers = 'App\Controllers\\';
    }

    public function invokeController()
    {
        $uri = $this->request->requestUri;
        $method = $this->request->requestMethod;
        $formatedUri = $this->formatRoute($uri);

        if ($formatedUri === '/') {
            $this->http->httpResponseCode(404);
            return;
        }

        if ($method == 'GET') {
            preg_match('/\?(.*)$/', $formatedUri, $match);

            if ($match) {
                $queryString = $match[1];
                $formatedUriWithoutQueryString = $this->request->deleteQueryStringFromUri($formatedUri);
                $this->routingToFilteredAction($formatedUriWithoutQueryString, $queryString);
                return;
            }

            preg_match('/^\/\w*$/', $formatedUri, $match);
            (!$match) ? $this->routingToGetAction($formatedUri) : $this->routingToDefaultAction($match);
            return;
        }

        if ($method == 'POST') {
            $body = $this->request->getBody();

            if (isset($body['_method'])) {
                $this->checkAndExecuteAction($formatedUri);
                return;
            }

            $this->routingToCreateAction($formatedUri);
            return;
        }

        if ($method == "DELETE") {
            $this->routingToUpdateAction($formatedUri);
            return;
        }
    }

    private function checkAndExecuteAction(string $uri)
    {
        $body = $this->request->getBody();

        if ($body['_method'] == 'PUT') {
            $this->routingToUpdateAction($uri);
            return;
        }


        if ($body['_method'] == 'DELETE') {
            $this->routingToDeleteAction($uri);
            return;
        }
    }

    private function createController(array $parameters)
    {
        [$controllerClass, $controllerMethod, $variablePath, $request] = $parameters;

        try {
            $controllerObject = new $controllerClass();

            if (!$variablePath && !$request) {
                $controllerObject->$controllerMethod();
                return;
            }

            if ($variablePath && $request) {
                $controllerObject->$controllerMethod($variablePath, $request);
                return;
            }

            if ($variablePath) {
                $controllerObject->$controllerMethod($variablePath);
                return;
            }

            $controllerObject->$controllerMethod($request);
        } catch (Error $e) {
            return $this->http->httpResponseCode(404);
        }
    }

    private function routingToDefaultAction($match)
    {
        $controllerNameSanitized = ltrim($match[0], '/');
        $controllerClassName = $controllerNameSanitized . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['/'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
        ];

        $this->createController($parameters);
    }

    private function routingToFilteredAction(string $uri, string $queryString)
    {
        $this->request->mapFromQueryStringToCollection($queryString);
        $controllerNameSanitized = ltrim($uri, '/');
        $controllerClassName = $controllerNameSanitized . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['filter'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
            null,
            $this->request
        ];

        $this->createController($parameters);
    }

    private function routingToGetAction(string $uri)
    {
        $controllerAndVariablePathCollection = $this->splitControllerAndVariablePath($uri);
        $controllerClassName = $controllerAndVariablePathCollection['controller'] . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['/id'];
        $variablePath = $controllerAndVariablePathCollection['variable'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
            $variablePath
        ];

        $this->createController($parameters);
    }

    private function routingToCreateAction(string $uri)
    {
        $controllerNameSanitized = ltrim($uri, '/');
        $controllerClassName = $controllerNameSanitized . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['post'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
            null,
            $this->request
        ];

        $this->createController($parameters);
    }

    private function routingToUpdateAction(string $uri)
    {
        $controllerAndVariablePathCollection = $this->splitControllerAndVariablePath($uri);
        $controllerClassName = $controllerAndVariablePathCollection['controller'] . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['put'];
        $variablePath = $controllerAndVariablePathCollection['variable'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
            $variablePath,
            $this->request
        ];

        $this->createController($parameters);
    }

    private function routingToDeleteAction(string $uri)
    {
        $controllerAndVariablePathCollection = $this->splitControllerAndVariablePath($uri);
        $controllerClassName = $controllerAndVariablePathCollection['controller'] . 'Controller';
        $controllerClass = $this->namespaceControllers . $controllerClassName;
        $controllerMethod = $this->pathMapCollection['delete'];
        $variablePath = $controllerAndVariablePathCollection['variable'];

        $parameters = [
            $controllerClass,
            $controllerMethod,
            $variablePath
        ];

        $this->createController($parameters);
    }

    private function splitControllerAndVariablePath(string $uri): array
    {
        $controllerAndVariablePathCollection = [];
        $uriSplited = preg_split('/\//', $uri);
        $controllerAndVariablePathCollection['controller'] = $uriSplited[1];

        if (!isset($uriSplited[2])) {
            throw new VariablePathNotFoundException('Variable path not found');
        }

        $controllerAndVariablePathCollection['variable'] = $uriSplited[2];
        return $controllerAndVariablePathCollection;
    }

    private function formatRoute(string $route): string
    {
        $result = rtrim($route, '/');

        if (empty($result)) {
            return '/';
        }

        return $result;
    }
}
