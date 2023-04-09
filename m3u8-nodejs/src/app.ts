import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});