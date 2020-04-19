FROM php:7.4-fpm

ARG WEB_USER
ARG WEB_GROUP
ARG PHP_ROOT_DIR

COPY www.conf ${PHP_ROOT_DIR}/php-fpm.d/www.conf

RUN pecl install xdebug

COPY xdebug.ini  /usr/local/etc/php/conf.d/

RUN apt-get update && apt-get install -y \ 
    libfreetype6-dev libjpeg62-turbo-dev \ 
    libgd-dev

RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo pdo_mysql

RUN usermod -u 1000 ${WEB_USER} \
    && groupmod -g 1000 ${WEB_GROUP} \
    && chgrp -R staff ${PHP_ROOT_DIR}/php-fpm.d/www.conf