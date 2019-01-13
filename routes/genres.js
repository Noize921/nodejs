const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Drame' },
    { id: 3, name: 'Fantasy' }
];

router.get('/', (req, resp) => {
    resp.send(genres);
});

router.get('/:id', (req, resp) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return resp.status(404).send("The genre with the given ID wasn't found!");

    resp.send(genre);
});

router.post('/', (req, resp) => {
    const {error} = validateGenre(req.body);

    if (error) return resp.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    resp.send(genre);
});

router.put('/:id', (req, resp) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return resp.status(404).send("The genre with the given ID wasn't found!");

    const {error} = validateGenre(req.body);

    if (error) return resp.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    resp.send(genre);
});

router.delete('/:id', (req, resp) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return resp.status(404).send("The genre with the given ID wasn't found!");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    resp.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

module.exports = router;