
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];

app.get('/', (req, res) => {
    res.send('Hello world!!!!!');
});

app.get('/api/courses', (req, res) => {
res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3)
    }
    const result = Joi.string().validate(req.body);
    console.log(result);

    if (!req.body.name || req.body.name.length < 3) {
        //    400 bad request
        res.status(400).send('Name is required and should be at least 3 characters long.');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Course not found`);
    res.send(course);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));