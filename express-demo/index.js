
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
// import express from "express";
// import helmet from "helmet";

const Joi = require('joi');
const logger = require('./logger');
const authenticator = require('./authenticator');
const express = require('express');
// const {func} = require("joi");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

//config
// console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail server: ${config.get('mail.host')}`);
// console.log(`Mail password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

// dbDebugger('Connected to the database...');

app.use(morgan('tiny'));

app.use(logger);
app.use(authenticator);

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
});

app.get('/api/courses', (req, res) => {
res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found`);

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found`);
    res.send(course);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));