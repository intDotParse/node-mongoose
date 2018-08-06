const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Users } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/user', (request, response) => {
    Users.find().then((userdoc) => {
        response.send(userdoc);
    }, (e) => {
        response.status(400).send(e);
    });
});

app.post('/user', (request, response) => {
    let body = _.pick(request.body, ['email', 'password']);
    let user = new Users(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send(user);
    }).catch((e) => {
        response.status(400).send(e);
    });
});

    // app.get('/', (request, response) => {
    //     users.find().then((user) => {
    //         response.send({
    //             user
    //         });
    //     },(err)=>{
    //         response.status(400).send(err);
    //     });

    // });



    app.listen(3000, () => {
        console.log(`Server running @ port 3000! `);
    });

