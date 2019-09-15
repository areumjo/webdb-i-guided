const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM Post (SQL)
    // db.select('*').from('posts');
    db.select('posts')
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get post' })
    })
});

router.get('/:id', (req, res) => {
    // SELECT * FROM posts WHERE id = param.id (SQL)
    const { id } = req.params;
    db.select('post').where({ id })
    .then(posts => {
        console.log('post: ', post); // multiple objects
        const post = posts[0];
        if (post) {
            res.json(posts);
        } else {
            res.status(404).json({ message: 'invalid post id' })
        }
        
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get post by id'})
    })
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;