// Les deux lignes peuvent etre remplacées par let app = require('express')();
const express = require('express');
const app = express();

// La on précise le moteur des vues et le langage de la vue
// @see https://expressjs.com/fr/guide/using-template-engines.html
app.set('view engine', 'ejs');

// On indique ici à express quel dossier sert a distribuer les fichiers statiques
// c'est de cette manière qu'on a pu récupérer le css contenu dedans
// En precisant assets en 1er arg, on le rajoute au chemin des fichiers à recup
// Ca permet de ranger au mieux si on le souhaite. Il faut donc rajouter assets à 
// chaque appel de fichier.  --- C'est un préfixe d'url ---
app.use('/assets', express.static('public'))


app.get('/', (req, res) => {
  res.render('pages/index', {test: 'salut'});
});


app.listen(3000);