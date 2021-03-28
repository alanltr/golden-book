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

// Middleware des msg flash
app.use(require('./middleware/flash'));

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  const Message = require('./models/message');
    // Asynchrone
    Message.all((messages) => {
      // On envoi le rendu en joignant les msg récupérés en BDD
      res.render('pages/index', { messages: messages });
    })
});

app.post('/', (req, res) => {
  // Si msg undefined ou vide :
  if (req.body.message === undefined || req.body.message === '') {
    // On crée une msg d'erreur en session
    req.flash('error', "Il y a une erreur vous n\'avez pas posté de message.");
    // Puis on redirige vers accueil ou on va afficher le msg d'erreur ou succès
    res.redirect('/');
  } else {
    const Message = require('./models/message');
    // Asynchrone | 1er arg: contenu / 2eme arg: callback
    Message.create(req.body.message, () => {
      req.flash('success', "Merci !")
      // Puis on redirige vers accueil ou on va afficher le msg d'erreur ou succès
      res.redirect('/');
    });
  }
})

// Route pour récup un seul msg
app.get('/message/:id', (req, res) => {
  // On importe notre modèle pour en bénéficier
  const Message = require('./models/message');

  // Async | On renvoi vers la méthode find qui va trouver le msg voulu | 1er arg: id / 2eme arg: callback
  Message.find(req.params.id, (message) => {
    // 1er arg: l'emplacement de la vue a render
    // 2eme arg: les var à injecter dans la vue
    res.render('messages/show', { message: message })
  })
})


app.listen(3000);






// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json())