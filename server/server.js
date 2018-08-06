const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { users } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/adduser', (request, response) => {
    let user = new users({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
        status: 'active',
        createdAt: new Date()
    }).save().then((doc) => {
        response.send(doc);
    }, (err) => {
        response.status(400).send(err);
    });
});

app.get('/', (request, response) => {
    users.find().then((user) => {
        response.send({
            user
        });
    },(err)=>{
        response.status(400).send(err);
    });

});

app.listen(3000, () => {
    console.log(`Server running @ port 3000! `);
});

