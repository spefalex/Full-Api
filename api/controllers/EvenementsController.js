/**
 * EvenementsController
 *
 * @description :: Server-side logic for managing Evenements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
module.exports = {
   
   
   


    // Accueil pour l'onglet evenement

    lire: function(req, res){
        var idUtilisateur= req.param('id');
        var moment =require('moment');
        var maintenant= moment();
        var jourRestant;
        
        Utilisateurs.findOne(idUtilisateur).exec(function(err, utilisateur){
            
            var localisationUtilisateur= utilisateur.localisation;
            var tagsUtilisateur = [utilisateur.centreInteret];
            var nombreTags = tagsUtilisateur.length;
            var evenementMatche = utilisateur.evenementMatcher[0].idEvenementMatcher;
            var evenementIgnore = utilisateur.evenementIgnorer[0].idEvenementIgnorer;
            var evenementSauvegarde = utilisateur.evenementSauvegarder[0].idEvenementSauvegarder;
            var bouttonParticiper;
            var bouttonAnnuler;
            if(localisationUtilisateur){
               
                Evenements.find({
                    ville: localisationUtilisateur,
                    statutEvenement: 'valid',
                    idEvenement: { '!' : [ evenementMatche, evenementIgnore,evenementSauvegarde ] }
                }).exec(function(err, evenement){
                   
                        var nombreResultat=evenement.length;
                        if(nombreResultat != 0){
                              for(i=0; i< evenement.length; i++){
                                  
                                        jourRestant = moment(maintenant).locale('fr').to(evenement[i].dateDebut);
                                            console.log(evenement[i] , jourRestant);
                                        
                                             }
                             
                        }else{
                            if(tagsUtilisateur.length != 0){
                                for(i=0; i<tagsUtilisateur.length; i++){
                                    Evenements.find({ 
                                        tags: tagsUtilisateur[i], 
                                        statutEvenement: 'valid' ,
                                        idEvenement: { '!' : [ evenementMatche, evenementIgnore, evenementSauvegarde ] }
                                    }).exec(function(err, evenement){
                                            for(i=0; i< evenement.length; i++){
                                             jourRestant = moment(maintenant).locale('fr').to(evenement[i].dateDebut);
                                             console.log(evenement[i] , jourRestant);
                                             
                                            }
             
                                        });
                                }
                            }else{
                                var requete= Evenements.find({
                                     idEvenement: { '!' : [ evenementMatche, evenementIgnore,evenementSauvegarde ] }
                                }); 
                                    requete.where({ statutEvenement: 'valid'});
                                    requete.sort('dateDebut ASC');
                                    requete.exec(function(err, evenement){
                                        for(i=0; i< evenement.length; i++){
                                    jourRestant = moment(maintenant).locale('fr').to(evenement[i].dateDebut);

                                    console.log(evenement[i] , jourRestant);
                                   
                                }
                                    });

                                    res.json('ici');
                            }
                           
                     }               
                });
            }else  {
                if(tagsUtilisateur.length != 0){
                        for(i=0; i<tagsUtilisateur.length; i++){
                            Evenements.find({ 
                            tags: tagsUtilisateur[i],
                            statutEvenement: 'valid',
                            idEvenement: { '!' : [ evenementMatche, evenementIgnore,evenementSauvegarde ] }
                            }).exec(function(err, evenement){
                                                            
                                for(i=0; i< evenement.length; i++){
                                    jourRestant = moment(maintenant).locale('fr').to(evenement[i].dateDebut);

                                    console.log(evenement[i] , jourRestant);   
                                }
                        });
                        }        
                }else{
                        var requete= Evenements.find({
                             idEvenement: { '!' : [ evenementMatche, evenementIgnore,evenementSauvegarde ] }
                        }); 
                        requete.where({ statutEvenement: 'valid'});
                        requete.sort('dateDebut ASC');
                        requete.exec(function(err, evenement){
                            
                                for(i=0; i< evenement.length; i++){
                                    jourRestant = moment(maintenant).locale('fr').to(evenement[i].dateDebut);

                                    console.log(evenement[i] , jourRestant);
                                   
                                }
                        });
                         
                    } 
                   
            }
            
          
        });

       
    },


    //Action losrque l'utilisateur personalise son filtre evenement dans la parametre
    modifierFiltre: function(req,res){
        var idUtilisateur= req.param('id');
        var moment =require('moment');
        var maintenant= moment().toDate();
        var jourRestant;
        
        Utilisateurs.findOne(idUtilisateur).exec(function(err, utilisateur){
 
             var evenementMatche = utilisateur.evenementMatcher[0].idEvenementMatcher;
            var evenementIgnore = utilisateur.evenementIgnorer[0].idEvenementIgnorer;
            var evenementSauvegarde = utilisateur.evenementSauvegarder[0].idEvenementSauvegarder;
             var dateEvenement =  req.param('date');
             var villeChercher = req.param('ville');
             var categorieChercher = req.param('categorie');
             var genreEvenementChercher = req.param('genre');
             var tagsChercher = req.param('tags');
             var tableauCategorie = categorieChercher.split(',');
             var tableauTags = tagsChercher.split(',');
                switch (dateEvenement) {
                  case 'aujourdhui':
                   
                      Evenements.find({ 
                         categorieEvenement: tableauCategorie,
                         ville: villeChercher,
                        genreEvenement: genreEvenementChercher,
                         tags: tableauTags,
                       dateDebut: moment().toDate(),
                     }).exec(function(err, evenement){
                
               
                             console.log(evenement);
                 });
                    
                    break;
                  case 'weekEnd':
                   Evenements.find({ 
                         categorieEvenement: tableauCategorie,
                         ville: villeChercher,
                        genreEvenement: genreEvenementChercher,
                         tags: tableauTags,
                        //dateDebut: maintenant,
                     }).exec(function(err, evenement){
                
               
                             console.log(evenement);
                 });
                    break;
                  case 'tous':
                   Evenements.find({ 
                         categorieEvenement: tableauCategorie,
                         ville: villeChercher,
                        genreEvenement: genreEvenementChercher,
                         tags: tableauTags,
                        statutEvenement: 'valid'
                     }).exec(function(err, evenement){
                
               
                             console.log(evenement);
                 });
                    break;
                  }



           });
    
        
   }
};