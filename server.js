// Les deux lignes peuvent etre remplacées par let app = require('express')();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');


/**
 * MOTEUR DE TEMPLATES
 */
// La on précise le moteur des vues et le langage de la vue
// @see https://expressjs.com/fr/guide/using-template-engines.html
app.set('view engine', 'ejs');

/**
 * MIDDLEWARES
 */
// On indique ici à express quel dossier sert a distribuer les fichiers statiques
// c'est de cette manière qu'on a pu récupérer le css contenu dedans
// En precisant assets en 1er arg, on le rajoute au chemin des fichiers à recup
// Ca permet de ranger au mieux si on le souhaite. Il faut donc rajouter assets à 
// chaque appel de fichier.  --- C'est un préfixe d'url ---
app.use('/assets', express.static('public'))

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Middleware de session | @see http://expressjs.com/en/resources/middleware/session.html
app.use(session({
  secret: 'azerty', // Clé de chiffrage du cookie
  resave: false, // Force la session à être sauvegardée dans le magasin de sessions, même si la session n'a jamais été modifiée pendant la demande
  saveUninitialized: true, // Force une session «non initialisée» à être enregistrée dans le magasin
  cookie: { secure: false } // false car on est pas en https
}))

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  // On vient ici récupérer notre msg d'erreur SI il existe
  if (req.session.error) {
    // On définit notre variable error créée en route POST de sorte à 
    // ce qu'elle soit accessible avec locals
    res.locals.error = req.session.error
    // Ensuite on supprime la variable
    req.session.error = undefined
  }
  res.render('pages/index');
});

app.post('/', (req, res) => {
  // Si msg undefined ou vide :
  if (req.body.message === undefined || req.body.message === '') {
    // On crée une msg d'erreur en session
    req.session.error = 'Il y a une erreur';
    // et on redirige vers accueil ou on va afficher ce msg
    res.redirect('/');
  }
})


app.listen(3000);






// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json())