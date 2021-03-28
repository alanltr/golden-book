let app = require('express')();

app.get('/', (req, res) => {
  res.send('Salut');
});

app.listen(3000);