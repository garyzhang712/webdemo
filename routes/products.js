var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', async function(req, res, next) {
    let data = await db('products').select('brand').count('*', { as: 'products' }).groupBy('brand');
    res.json(data);
});

router.get('/:id', async function(req, res) {
    let data = await db('products').where('id', req.params.id).select('*');
    let comments = await db('comments').where('product_id', req.params.id).select('*');
    res.json({ ...data[0], comments });
})

router.get('/list/:brand', async function(req, res) {
    let data = await db('products').where('brand', req.params.brand).select('*');
    res.json(data);
})

router.post('/comment', async function(req, res) {
    let data = await db('comments').insert({
        product_id: req.body.product_id,
        username: req.body.username,
        content: req.body.content,
    });
    res.json(data);
})

module.exports = router;
