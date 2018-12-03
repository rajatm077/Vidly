const express = require('express');
const app = express();

app.get('/', () => {
  console.log('in');
})

app.listen(8081, () => {
  console.log('Temp server listening on port 8081');
})
