var
  jwt = require('jsonwebtoken'),
  tokenSecret = "secretissecet";

// Génère un jeton à partir de la charge utile fournie
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret que nous signons avec
    {
        expiresIn : 60*60*24 // Token Expire 
    }
  );
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, // vérification token
    tokenSecret, 
    {}, 
    callback 
  );
};