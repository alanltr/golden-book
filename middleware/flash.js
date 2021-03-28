module.exports = (req, res, next) => {

  // On a notre erreur en session mtn il faut la passer en locals de  
  // sorte à ce qu'elle soit accessible dans la vue ejs avec locals
  if (req.session.flash) {
    // On créé une clé flash sur locals
    res.locals.flash = req.session.flash;
    // Ensuite on supprime la variable de session
    req.session.flash = undefined;
  }

  req.flash = (type, content) => {
    // Eviter les erreurs si la var n'existe pas
    if (req.session.flash === undefined) {
      req.session.flash = {};
    }
    // Ici on vient récupérer la clé 'error' et on assigne le contenu
    // Appelée dans le app.post de server.js
    req.session.flash[type] = content
  }

  next();
}