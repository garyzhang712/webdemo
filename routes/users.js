var express = require('express');
var router = express.Router();
var db = require('../db');
var jsonwebtoken = require('jsonwebtoken');
const authorize = (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Miss token"
        })
    }

    try {
        const decoded = jsonwebtoken.verify(token, '123345')
        req.decoded = decoded;
        if (decoded.exp < Date.now()) {
            return res.status(401).json(errors.TokenExpired)
        }
        next();
    } catch (e) {
        return res.status(401).json(errors.InvalidJWT)
    }
}

router.get('/cart', authorize, async function(req, res) {

    let data = await db('carts')
        .join('products', 'products.id', 'carts.product_id')
        .select('*')
        .where('user_id', req.decoded.user.id)

    res.json(data)
});

router.get('/placeorder', authorize, async function(req, res) {
    await db('carts').where('user_id', req.decoded.user.id).del()
    res.end()
})

router.post('/addToCart', authorize, async function(req, res) {

    let { product_id, quantity } = req.body;
    let item = await db('carts').select('*').where('user_id', req.decoded.user.id).where('product_id', product_id).first();
    if (item) {
        await db('carts').where('product_id', product_id).where('user_id', req.decoded.user.id).update({
            quantity: ((item.quantity + (+quantity)) > 0 ? (item.quantity + (+quantity)) : 1)
        })
    } else {
        await db('carts').insert({
            user_id: req.decoded.user.id,
            product_id,
            quantity
        })
    }
    res.json({
        message: "Product has been added to cart"
    })
})


router.post('/removeFromCart', authorize, async function(req, res) {

    let { product_id } = req.body;

    await db('carts').where('product_id', product_id).where('user_id', req.decoded.user.id).del();

    res.end()

})

module.exports = router;
