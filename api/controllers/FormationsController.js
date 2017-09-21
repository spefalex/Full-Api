/**
 * FormationsController
 *
 * @description :: Server-side logic for managing Formations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Accueil pour l'onglet formation
    lire: function(req, res){
        var idUtilisateur = req.param('id');
        Utilisateurs.findOne(idUtilisateur).exec(function(err, utilisateur){
            
             Formations.find({
                statutFormation :'valid'

            }).exec(function(err, formation){
                res.json(formation);

            });
         

        });

    },


     //Action losrque l'utilisateur personalise son filtre formation dans la parametre
	modifierFiltre: function(req,res){
       var idUtilisateur = req.param('id');
       Utilisateurs.findOne(idUtilisateur).exec(function(err, utilisateur){

            var villeChercher = req.param('ville');
            var domaine = req.param('domaine');
            var typeEtablissement= req.param('etablissement');
            var typeFormation = req.param('typeFormation');
            var tags = req.param('tags').split(",");

           
                
                Formations.find({
                    statutEtablissement : typeEtablissement,
                    ville: villeChercher,
                    domaine: domaine,
                    tagsFormation: [tags],
                    typeFormation : typeFormation


                }).exec(function(err, formation){
               res.json(formation);
                });
                
                 
          
       });
    }
};

