# jwt-tutorial

#8Apr2023
jwt tutorial in nodejs project

basedOn: https://youtu.be/mbsmsi7l3r4

NodeJs - fresh project creation commands

$ npm init -y ===> for basic setups
$ npm i express jsonwebtoken dotenv ===> dependencies
$ npm i --save-dev nodemon ===> install nodemon for restart server every new change we do

packages.json

add the following in,

"scripts": {
    "devStart" : "nodemon server.js",
}


to get random secret keys
$ node
> require('crypto').randomBytes(64).toString('hex') - https://youtu.be/mbsmsi7l3r4?t=514
