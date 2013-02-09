#!/bin/bash

curl http://downloads.mongodb.org/osx/mongodb-osx-x86_64-1.8.5.tgz > /usr/local/src/mongo.tgz
cd /usr/local/src
tar -zxvvvf mongo.tgz

mv mongodb-osx-x86_64-1.8.5/ /usr/local/var/mongodb

ln -sf /usr/local/var/mongodb/bin/mongo /usr/local/bin
ln -sf /usr/local/var/mongodb/bin/mongod /usr/local/bin

echo 'Go to your moody_friends directory, and run `mkdir -p tmp/db` then `mongod --db=tmp/db`'
