
var bcrypt = require('bcrypt-nodejs');

module.exports = { tableName: "users", 
 attributes: 
 { 

  id_user:{type:'integer'},
 	first_name : { type: 'string'},
 	last_name : { type: 'string', required:true },
 	anne_naissance: { type : 'integer'},
 	sexe: { type:'string',enum:['male','female']}, 
 	e_mail:{type:'string'},
 	password:{type:'string'},
 	access_mode:{type:'string'},
 	localisation:{type:'string'},
  apropos:{type:'string'},
  centreInteret:{type:'string'},
  poste:{type:'string'},
  nom_societe:{type:'string'},
  niveau:{type:'string'},
  filiere:{type:'string'},
  nomEtablisement:{type:'string'},
  id_evenement:{type:'integer'},
  detailEvenement:{type:'string'},
  id_evenement_sauvegarde:{type:'integer'},
  detailEvenement:{type:'string'},
  id_formation_sauvegarde:{type:'integer'},
  detail_formation_sauvgarde:{type:'integer'},
  id_emploie_match:{type:'integer'},
  detail_emploie_match:{type:'string'},
  id_emploie_sauvagrde:{type:'integer'},
  detail_emploie_saugarde:{type:'string'},
  id_other_user:{type:'integer'},
  nom_fichier:{type:'string'},
  password: {type:'string'},

	toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
}

},

 beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt,null, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  comparePassword : function (password, User, cb) {
    bcrypt.compare(password, User.password, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};
