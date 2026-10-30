<?php

/**
 * This file is included very early. See autoload.files in composer.json and
 * https://getcomposer.org/doc/04-schema.md#files
 */

use Dotenv\Dotenv;

/**
 * Load any .env file. See /.env.example.
 *
 * Drupal has no official method for loading environment variables and uses
 * various techniques to set and get them. Environment variables loaded from
 * .env will be available through getenv(), $_ENV and $_SERVER.
 */
$dotenv = Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->safeLoad();
