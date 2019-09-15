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
    // INSERT INTO posts (all of the keys from req.body) VALUE (all of the values from req.body)
    const postData = req.body;

    db('post').insert(postData)
    .then(ids => {
        res.status(201).json({ nesPostId: ids[0] })
    })
    .catch(err => {
        console.log('post error: ', err)
        res.status(500).json({ message: 'Failed to insert post'})
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // UPDATE Posts SET changes.key = change.value WHERE id = id (SQL)
    // .where() comes first
    db('posts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count })
        } else {
            res.status(404).json({ message: 'invalid post id' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update post'})
    })

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // DELETE FROM posts WHERE id = id (SQL);
    db('posts').whereRaw({ id }).del()
    .then(count => {
        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'invalid post id' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete post'})
    })
});

module.exports = router;