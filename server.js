const express = require('express');

const app = express();

const session = require('express-session');

const messageRoute = require(('./routes/message'));

/**
 * MOTEUR DE TEMPLATES
 */
// La on précise le moteur des vues et le langage de la vue
// @see https://expressjs.com/fr/guide/using-template-engines.html
app.set('view engine', 'ejs');

/**
 * MIDDLEWARES
 */
// Middleware des appels vers les assets
// On indique ici à express quel dossier sert a distribuer les fichiers statiques
// c'est de cette manière qu'on a pu récupérer le css contenu dedans
// En precisant assets en 1er arg, on le rajoute au chemin des fichiers à recup
// Ca permet de ranger au mieux si on le souhaite. Il faut donc rajouter assets à
// chaque appel de fichier.  --- C'est un préfixe d'url ---
app.use('/assets', express.static('public'));

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

// Middleware de session | @see http://expressjs.com/en/resources/middleware/session.html
app.use(session({
  secret: 'azerty', // Clé de chiffrage du cookie
  resave: false, // Force la session à être sauvegardée dans le magasin de sessions
  saveUninitialized: true, // Force une session «non initialisée» à être enregistrée dans le magasin
  cookie: { secure: false }, // false car on est pas en https
}));

// Middleware des msg flash
app.use(require('./middleware/flash'));

// Middleware des routes
app.use('/', messageRoute);

app.listen(3000);
