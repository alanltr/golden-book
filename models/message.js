const connection = require('../config/db');

class Message {

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
        callback(rows);
      }
    );
  };
};

module.exports = Message;