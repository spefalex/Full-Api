/**
 * Entreprise.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');
module.exports = {
tableName: "institutions", 
  attributes: {

  	
  	nom: {type: 'string'},
    motDePasse: {type:'string'},
  	localisation: {type: 'string'},
    
    adresse: {type: 'string'},
    ville:{type: 'string'},
  	dateCreation:{type: 'string'},
    nombreSalarie: {type: 'string'},
    domaine:{type: 'string'},
    logo:{type: 'string'},
    presentation:{type: 'string'},
    telephone:{type: 'string'},
    email: {type:'string'},
    idUtilisateurAvis:{type:'integer'},
    nomUtlisateurAvis: {type: 'string'},
    commentaireAvis:{type: 'string'},
    noteAvis:{ type:'string'},
    idEvenement: { type:'integer'},
    idOffreEmploie: {type:'integer'},
    idFormation:{type: 'integer'},
    idUtilisateurAbonnes:{ type :'integer'},

      toJSON: function () {
      var obj = this.toObject();
      delete obj.motDePasse;
      return obj;
}
  },

   beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.motDePasse, salt,null, function (err, hash) {
        if(err) return next(err);
        values.motDePasse = hash;
        next();
      })
    })
  },

  comparePassword : function (password, User, cb) {
    bcrypt.compare(motDePasse, Utilisateurs.motDePasse, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }



};

