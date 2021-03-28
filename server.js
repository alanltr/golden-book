// Les deux lignes peuvent etre remplacées par let app = require('express')();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('pages/index', {test: 'salut'});
});


app.listen(3000);