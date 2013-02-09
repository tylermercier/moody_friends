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
