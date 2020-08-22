<?php

namespace App\Services\Components\Routing;

use App\Services\Components\Routing\Interfaces\RequestInterface;

class Request implements RequestInterface
{
    private $queryStringCollection;

    public function __construct()
    {
        $this->bootstrapSelf();
        $this->queryStringCollection = [];
    }

    private function bootstrapSelf(): void
    {
        foreach ($_SERVER as $key => $value) {
            $this->{$this->toCamelCase($key)} = $value;
        }
    }

    private function toCamelCase(string $key): string
    {
        $result = strtolower($key);

        preg_match_all('/_[a-z]/', $result, $matches);

        if (empty($matches[0])) {
            return $result;
        }

        foreach ($matches[0] as $key => $match) {
            $LowDashRemoved = str_replace('_', '', $match);
            $LowDashRemovedUppercase = strtoupper($LowDashRemoved);
            $camelCaseResult = str_replace($match, $LowDashRemovedUppercase, $result);
            $result = $camelCaseResult;
        }

        return $camelCaseResult;
    }

    public function getBody(): array
    {
        if ($this->requestMethod === 'POST') {
            $body = [];

            foreach ($_POST as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }

            return $body;
        }
    }

    public function getFiles(): array
    {
        return $_FILES;
    }

    public function getQueryString(): array
    {
        return $this->queryStringCollection;
    }

    public function mapFromQueryStringToCollection(string $queryString): void
    {
        $queryStringDivided = preg_split('/&/', $queryString);

        foreach ($queryStringDivided as $queryString) {
            $queryStringSplited = preg_split('/=/', $queryString);
            $key = $queryStringSplited[0];
            $value = $queryStringSplited[1];
            $this->queryStringCollection[$key] = $value;
        };
    }

    public function deleteQueryStringFromUri($uri)
    {
        preg_match('/^(.*)\?/', $uri, $match);

        return $match[1];
    }
}
