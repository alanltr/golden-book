// Import de notre module moment qu'on a défini en 'fr'
const moment = require('../config/moment');
// Import du fichier de config de connexion à la bdd
const connection = require('../config/db');

class Message {
  // C'est grace au constructeur qu'on peut réassigner des données depuis les données reçues,
  // comme le formatage de la date par exemple (voir get created_at)
  // Pour que le modele soit correctement construit il faut mapper sur nos résultats de BDD
  // et pour chaque itération créé une instance de Message
  constructor (row) {
    this.row = row
  };

  // Getter de l'id
  get id () {
    return this.row.id;
  }
  // Getter du content
  get content () {
    return this.row.content;
  }
  // Getter du created_at
  get created_at () {
    return moment (this.row.created_at);
  }

  static create (content, callback) {
    // Effectue la connection avec la base
    connection.query(
      // 1er arg : la requete Sql
      'INSERT INTO messages SET content = ?, created_at = ?',
      // 2eme arg : tableau de données à insérer
      [content, new Date()],
      // 3eme arg : callback qui prend en paramétre 1. une erreur s'il y en a une et 2. le résultat
      (err, result) => {
        // Si une erreur, on l'affiche
        if (err) throw err
        // Sinon tt s'est bien passé on éxecute la callback
        callback(result);
      }
    );
  };

  static all (callback) {
    connection.query(
      // 1er arg : la requete Sql
      'SELECT * FROM messages',
      // 2eme arg : callback qui prend en paramétre 1. une erreur s'il y en a une et 2. le nb de lignes retournées
      (err, rows) => {
        if (err) throw err
        // Sinon tt s'est bien passé on éxecute la callback
        // On map sur le résultat pour que chaque message récupéré en base soit une 
        // instance de notre classe. Voir constructor et getter
        callback(rows.map((row) => new Message(row)));
      }
    );
  };

  static find (id, callback) {
    connection.query(
      // 1er arg : la requete Sql
      'SELECT * FROM messages WHERE id = ?',
      // 2eme arg : l'id pour la requete
      [id],
      // 3eme arg : callback qui prend en paramétre 1. une erreur s'il y en a une et 2. le nb de lignes retournées
      (err, rows) => {
        if (err) throw err
        // Sinon tt s'est bien passé on éxecute la callback
        // On map sur le résultat pour que chaque message récupéré en base soit une 
        // instance de notre classe. Voir constructor et getter
        callback(new Message(rows[0]));
      }
    );
  };
};

module.exports = Message;