/**
 * Entreprise.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	id_entreprise: {type: 'integer'},
  	nom: {type: 'string'},
  	localisation: {type: 'string'},
  	domaine: {type: 'string'},
  	
  	
  	id_evenement: {type: 'integer'},
  	nom_event: {type: 'string'},
  	date_debut: {type: 'string'},
  	date_fin: {type: 'string'},
  	
  	id_emploie: {type: 'integer'},
  	nom_offre: {type: 'string'}, 
  	nom_entreprise: {type: 'string'},
  },

  beforeCreate: function(obj, next){
    Entreprise.count().exec(function(err, cnt){
        if(err) next(err);
        else{
            obj['id_entreprise'] = cnt + 1;

            
            next(null);
        }
    })
},



};

