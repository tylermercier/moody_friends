#!/bin/bash

curl http://downloads.mongodb.org/osx/mongodb-osx-x86_64-1.8.5.tgz > /usr/local/src/mongo.tgz
tar -zxvvvf /usr/local/src/mongo.tgz

mv /usr/local/src/mongodb-osx-x86_64-1.8.5/ /usr/local/var/mongodb

ln -sf /usr/local/var/mongodb/bin/mongo /usr/local/bin
ln -sf /usr/local/var/mongodb/bin/mongod /usr/local/bin

echo 'Then run `mkdir -p tmp/db` and `mongod --dbpath=tmp/db` from your moody-friends server directory'
