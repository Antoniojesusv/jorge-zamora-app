<?php

namespace App\Controllers;

use App\Services\Components\Routing\Request;

class MainVideoController
{
    public function __construct()
    {
    }

    public function index()
    {
        var_dump('Soy el index MainVideoController');
    }

    public function getFilterAction(Request $request)
    {
        var_dump('Soy el filter action');
        var_dump($request->getQueryString());
    }

    public function getAction(string $id)
    {
        var_dump('Cogo un video en concreto');
        var_dump($id);
    }

    public function createAction(Request $request)
    {
        var_dump('Crear un nuevo video');
        var_dump($request->getBody()['Nombre']);
        $files = $request->getFiles();

        if (!empty($files)) {
            var_dump($files);
        }
    }

    public function updateAction(string $id, Request $request)
    {
        var_dump('Actualizar un video');
        var_dump($id);
        var_dump($request->getBody()['Nombre']);
        var_dump($request->getBody()['_method']);
        $files = $request->getFiles();

        if (!empty($files)) {
            var_dump($files);
        }
    }

    public function deleteAction(string $id)
    {
        var_dump('Eliminar un video');
        var_dump($id);
    }
}
