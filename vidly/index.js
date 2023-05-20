'use strict';

const Joi = require('joi');
const express = require('express');
const {func} = require("joi");
const app = express();

app.use(express.json());

const genres = [
    { id: 1, genre: 'horror' },
    { id: 2, genre: 'action' },
    { id: 3, genre: 'western' },
    { id: 4, genre: 'drama' }
];

app.get('/', (req, res) => {
    res.send('Welcome to Vidly');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(genre);
    res.send(genre);
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));