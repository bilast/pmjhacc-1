const express = require('express');

// Constants
const PORT = 3000;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Puppeteer is up and running');
});

app.listen(PORT, () => {

});

