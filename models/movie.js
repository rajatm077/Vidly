const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(5).max(255).required(),
    dailyRentalRate: Joi.number().min(5).max(255).required(),
  }

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
  