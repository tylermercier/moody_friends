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


## Configuration
Setup your twitter environment variables by throwing this in your .localrc, .bashrc, or whatevs:

export MOODY_TWITTER_CONSUMER_KEY=foobar
export MOODY_TWITTER_CONSUMER_SECRET=some_secret
export MOODY_TWITTER_ACCESS_TOKEN=some_token
export MOODY_TWITTER_ACCESS_TOKEN_SECRET=some_token_secret