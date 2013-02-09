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

    or in a separate terminal type `mongod`


## Configuration

Setup twitter auth environment variables by throwing this in your .localrc, .bashrc, or whatevs:

    export MOODY_TWITTER_CONSUMER_KEY=eY9sLb5ezDtmpcST2aD4w
    export MOODY_TWITTER_CONSUMER_SECRET=6vZn8uQcrzWM2ZuSMSt5TtPlkNGc1TlAyVU6yCBSs
    export MOODY_TWITTER_ACCESS_TOKEN=28595285-Af8i7OP6uaIMFFimyFqg15rgLyc5R2FtDXHXeinZt
    export MOODY_TWITTER_ACCESS_TOKEN_SECRET=qVC1VxMmgwVSZCWJItVCcEAdCKgRHp4td165cOh1als

