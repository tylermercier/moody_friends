moody_friends server
====================

## Autorefresh

    npm install -g supervisor
    supervisor app.js

## Setup Mongo

    bash mongo_install.sh
    mkdir -p tmp/db

## Start Mongo

    mongod --dbpath=tmp/db


## Configuration

We're using the konphyg module to manage configuration settings.

JSON config files are kept in the ./config directory and can be set to specific environments:

   **`redis.json`** is the base file.
   **`redis.test.json`** will be loaded in the test environment and override the base file config, where applicable.

*For full deets check out [Konphyg's GitHub page](https://github.com/pgte/konphyg).*
