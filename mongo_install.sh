# install jenkins

#curl http://downloads.mongodb.org/osx/mongodb-osx-x86_64-1.8.5.tgz > mongo.tgz
tar -zxvvvf mongo.tgz

mv mongodb-osx-x86_64-1.8.5/ /usr/local/var/mongo

ln -sf /usr/local/var/mongo/bin/mongo /usr/local/bin
ln -sf /usr/local/var/mongo/bin/mongod /usr/local/bin

