const express = require('express');
const router  = express.Router();
const _       = require('lodash');
const bcrypt  = require('bcrypt');
const auth    = require('../middleware/auth');

const { User, validate } = require('../models/user');
const asyncMiddleware = require('../middleware/async');

router.get('/me', auth, asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: 0 });
  res.send(user);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    // hash the password before storing in db.
    user.password = await bcrypt.hash(user.password, 10);

    user = await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
       .send(_.pick(user, ['name', 'email']));   
}));

module.exports = router;