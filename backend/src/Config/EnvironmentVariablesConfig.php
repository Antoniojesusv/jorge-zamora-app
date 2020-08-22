<?php

namespace App\Config;

class EnvironmentVariablesConfig
{
    public function __construct()
    {
    }

    public function getVariable(string $varname)
    {
        return getenv($varname, true) ?: getenv($varname);
    }
}
