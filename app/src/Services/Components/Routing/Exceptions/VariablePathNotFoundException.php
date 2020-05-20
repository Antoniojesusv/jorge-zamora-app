<?php

namespace App\Services\Components\Routing\Exceptions;

use Error;

class VariablePathNotFoundException extends Error
{
    public function __construct($message)
    {
        parent::__construct($message);
    }
}
