const genres    = require('./routes/genres');
const customers = require('./routes/customers');
const movies    = require('./routes/movies');
const users     = require('./routes/users');
const auth      = require('./routes/auth');

const config    = require('config');
const helmet    = require('helmet');
const mongoose  = require('mongoose');
const express   = require('express');

const app = express();

mongoose.connect(config.get('dbConnection'), { useNewUrlParser: true })
  .then(() => console.log('Connect to db'))
  .catch(err => console.log(err.message));

app.use(helmet());
app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

const port = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`server listening on ${port}`);
})
