const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort({ name: 1});  
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  
  if (!customer) return res.status(404).send('genres not found!');

  res.send(customer);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name, 
    phone: req.body.phone, 
    isGold: req.body.isGold 
  }, { new : true });
  
  
  if (!genres) return res.status(404).send('genres not found!');
  res.send(genres);
});

router.delete('/:id', auth, async (req, res) => {
  const genre = await Customer.findByIdAndDelete(req.params.id);
  
  if (!genre) return res.status(404).send('genres not found!');

  res.send(genre);  
});

module.exports = router;