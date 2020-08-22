<?php

namespace App\Config\Dependencies;

use App\Services\Components\Routing\HttpService;
use App\Services\Components\Routing\Request;
use App\Services\Components\Routing\Router;
use Psr\Container\ContainerInterface;
use function DI\factory;
use function DI\create;

return [
    'Request' => create(Request::class),
    'HttpService' => create(HttpService::class),
    'Router' => factory(function (ContainerInterface $c) {
        return new Router($c->get('Request'), $c->get('HttpService'));
    })
];
