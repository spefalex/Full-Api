
var bcrypt = require('bcrypt-nodejs');

module.exports = { tableName: "utilisateurs", 
 attributes: 
 { 

  nomUtilisateur:{type:'string'},
 	    prenomUtilisateur : { type: 'string'},
           anneNaissance: { type : 'integer'},
 	            sexe: { type:'string',enum:['male','female']}, 
 	
  photoUtilisateur:{type:'string'},
 	 numeroMobile:{type:'string'},
 	  adresseMail:{type:'string'},
 	    motDePasse:{type:'string'},
        age:{type:'string'},
    localisation:{type:'string'},
      aPropos:{type:'string'},
        poste:{type:'string'},
  idEntrepriseSuivi:{type:'integer'},
  nomSociete:{type:'string'},
      diplome:{type:'string'},
          filiere:{type:'string'},
            nomEtablissement:{type:'string'},
  
    idEvenementMatch:{type:'integer'},
    idEvenementSauvegarde:{type:'integer'},
    idFormationSauvarde:{type:'integer'},
    idEmploieMatch:{type:'integer'},
    idEmploieSauvegarde:{type:'integer'},
    idUtilisateurMatch:{type:'integer'},
    idUtilisateurBloque:{type:'integer'},

    cv:{type:'string'},
  

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

  comparePassword : function (motDePasse, Utilisateurs, cb) {
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
