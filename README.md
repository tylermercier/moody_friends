moody_friends server
====================

## Autorefresh

    npm install -g supervisor
    supervisor app.js

## Setup Mongo

    brew install mongo

## Start Mongo

    mkdir tmp/db
    mongod --dbpath=tmp/db

## Configuration Environment Variables

Setup twitter auth environment variables by throwing this in your .localrc, .bashrc, or whatevs:
After creating a Twitter app, set these environment variables:

    export MOODY_TWITTER_CONSUMER_KEY=foobar
    export MOODY_TWITTER_CONSUMER_SECRET=some_secret
    export MOODY_TWITTER_ACCESS_TOKEN=some_token
    export MOODY_TWITTER_ACCESS_TOKEN_SECRET=some_token_secret
