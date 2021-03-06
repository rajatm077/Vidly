const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
  
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(genre) {
  const schema = {
    name: Joi.string().min(5).required()
  }

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.User = Genre;
exports.validate = validateGenres; 