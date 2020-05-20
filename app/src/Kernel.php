<?php

namespace App;

use App\Services\Components\Routing\Request;
use App\Services\Components\Routing\Router;
use App\Services\Components\Routing\HttpService;

class Kernel
{
    public function __construct()
    {
        $this->request = new Request();
        $this->http = new HttpService();
        $this->router = new Router($this->request, $this->http);
        $this->router->invokeController();
    }
}
