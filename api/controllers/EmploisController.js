/**
 * EmploisController
 *
 * @description :: Server-side logic for managing Emplois
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     //Action losrque l'utilisateur personalise son filtre emploi dans la parametre
    modifierFiltre: function(req, res){
        var idUtilisateur = req.param('id');
        Utilisateurs.findOne({idUtilisateur:idUtilisateur}).exec(function(err, utilisateur){
            var ville = req.param('ville');
            var domaine = req.param('domaine');
            var typeContrat = req.param('contrat');
            var tags = req.param('tags');
            var tableauTags = tags.split(",");
            Emplois.find({
                ville: ville,
                domaine : domaine,
                typeContrat : typeContrat,
                tagsEmploi: tableauTags,
                statutEmploi : 'valid'

            }).exec(function(err, emplois){
                res.json(emplois);
            })
        });
    }
};

