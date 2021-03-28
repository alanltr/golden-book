const Message = require('../models/message');

exports.createMessage = (req, res) => {
  // Si msg undefined ou vide :
  if (req.body.message === undefined || req.body.message === '') {
    // On crée une msg d'erreur en session
    req.flash('error', 'Il y a une erreur vous n\'avez pas posté de message.');
    // Puis on redirige vers accueil ou on va afficher le msg d'erreur ou succès
    res.redirect('/');
  } else {
    // Asynchrone | 1er arg: contenu / 2eme arg: callback
    Message.create(req.body.message, () => {
      req.flash('success', 'Merci !');
      // Puis on redirige vers accueil ou on va afficher le msg d'erreur ou succès
      res.redirect('/');
    });
  }
};

exports.getAll = (req, res) => {
  // Asynchrone
  Message.all((messages) => {
    // On envoi le rendu en joignant les msg récupérés en BDD
    res.render('pages/index', { messages });
  });
};

exports.getOne = (req, res) => {
  // Async | On renvoi vers la méthode find qui va trouver le msg voulu
  // 1er arg: id / 2eme arg: callback
  Message.find(req.params.id, (message) => {
    // 1er arg: l'emplacement de la vue a render
    // 2eme arg: les var à injecter dans la vue
    res.render('messages/show', { message });
  });
};
