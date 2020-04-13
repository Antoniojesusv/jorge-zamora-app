<?php

namespace App;

spl_autoload_register(function ($className) {
    $replacedClassName = str_replace(['\\', 'App'], [DIRECTORY_SEPARATOR, ''], $className);
    define('__ROOT__', dirname(dirname(__FILE__)));
    $path = __ROOT__  . DIRECTORY_SEPARATOR . 'src' . $replacedClassName . '.php';
    include_once $path;
});

var_dump('Hola xiwily4');
