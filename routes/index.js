var express = require('express');
var router = express.Router();
var db = require('../db');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/login', async function(req, res) {
  let { email, password } = req.body;
  let user = await db('users')
    .select('*')
    .where('email', email)
    .first();
  console.log(user)
  if (!user) {
    return res.status(404).json({
      error: 404,
      msg: 'User not found or password is not correct'
    })
  }

  if (password !== user.password) {
    return res.status(400).json({
      error: 404,
      msg: 'User not found or password is not correct'
    })
  }
  delete user.password
  const expires_in = 60 * 60 * 24;
  const exp = Date.now() + expires_in * 1000;
  const token = jwt.sign({ user, exp }, '123345')
  res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000 * 18000 });
  return res.json({ access_token: token, expires_in: 1000 * 18000, user })

});

router.post('/register', async function(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      error: 400,
      msg: "Both email and password are required"
    })
  }

  let user = await db('users')
    .select('*')
    .where('email', email)
    .first();

  if (user) {
    return res.status(500).json({
      msg: "Email has been token"
    })
  }

  await db('users').insert({
    email, password, username
  })

  return res.status(200).json({
    msg: "User created"
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token').end();
});

module.exports = router;
