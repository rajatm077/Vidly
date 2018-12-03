const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: 'Not a valid phone number' 
    }
  }
});

const Customer = mongoose.model('customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().length(10).required()
  }

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;