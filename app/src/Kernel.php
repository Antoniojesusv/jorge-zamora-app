<?php

namespace App;

use App\Config\EnvironmentVariablesConfig;
use DI\ContainerBuilder;

class Kernel
{
    public function __construct()
    {
        $environment = new EnvironmentVariablesConfig();
        $appDir = $environment->getVariable('PHP_APP_DIR');
        $pathContainerDepencies = 'src/Config/Dependencies/ContainerDependenciesConfig.php';
        $containerBuilder = new ContainerBuilder();
        $containerBuilder->addDefinitions($appDir . DIRECTORY_SEPARATOR . $pathContainerDepencies);
        $container = $containerBuilder->build();
        $this->router = $container->get('Router');
        $this->router->invokeController();
    }
}
