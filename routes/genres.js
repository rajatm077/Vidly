const express = require('express');
const router = express.Router();

const { User, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res) => {
  const genres = await User.find().sort({ name: 1});  
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await User.findById(req.params.id);
  
  if (!genre) return res.status(404).send('genres not found!');

  res.send(genre);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new User({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name }, { new : true });
  
  
  if (!genres) return res.status(404).send('genres not found!');
  res.send(genres);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await User.findByIdAndDelete(req.params.id);
  
  if (!genre) return res.status(404).send('genres not found!');

  res.send(genre);  
});


module.exports = router;