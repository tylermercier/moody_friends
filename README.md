moody_friends server
====================

## Autorefresh

    npm install -g supervisor
    supervisor app.js

## Setup Mongo

    brew install mongo


## Start Mongo

    # On Startup
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

## Environment Variables

Setup twitter auth environment variables by throwing this in your .localrc, .bashrc, or whatevs:

* `export MOODY_TWITTER_CONSUMER_KEY=???`         - Your Twitter App Consumer Key
* `export MOODY_TWITTER_CONSUMER_SECRET=???`      - Your Twitter App Consumer Secret
* `export MOODY_TWITTER_ACCESS_TOKEN=???`         - Your Twitter App Access Token
* `export MOODY_TWITTER_ACCESS_TOKEN_SECRET=???`  - Your Twitter App Token Secret
