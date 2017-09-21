/**
 * EntrepriseController
 *
 * @description :: Server-side logic for managing Entreprises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mailer = require("nodemailer");
var twilio = require('twilio');
var smtpTransport = mailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
            user: "keymada17@gmail.com",
            pass: "keymada1234"
          }
        });

module.exports = {
    


  /**
   * `EntrepriseController.create()`
   */
  createInstitution: function (req, res) {

    let nom = req.param('nom'),
  
    motDePasse = req.param('motDePasse'),
    localisation = req.param('localisation'),
    adresse = req.param('adresse'),
    ville = req.param('ville'),
    dateCreation = req.param('dateCreation'),
    nombreSalarie = req.param('nombreSalarie'),
    domaine = req.param('domaine'),
    logo = req.param('logo'),
    code= req.param('code'),
    presentation = req.param('presentation'),
    telephone = req.param('telephone'),
    email = req.param('email'),
    idUtilisateurAvis = req.param('idUtilisateurAvis'),
    nomUtlisateurAvis = req.param('nomUtlisateurAvis'),
    commentaireAvis = req.param('commentaireAvis'),
    noteAvis = req.param('noteAvis'),
    idEvenement = req.param('idEvenement'),
    siteWeb=req.param('siteWeb'),
    idOffreEmploie = req.param('idOffreEmploie'),
    idFormation = req.param('idFormation'),
    typeEtablisment =req.param('typeEtablisment'),
    idUtilisateurAbonnes = req.param('idUtilisateurAbonnes');

Institutions.count({email:email}).exec(function countCB(error, found) {
  
  Institutions.find({telephone:telephone}).exec(function (err, phone){

var verifPhone=phone.length;


  var verifMail= +found;
  console.log(found);
  


  if(verifMail == 1 && verifPhone == 0){
 res.header("Access-Control-Allow-Origin", "*"); res.json({ message: 'Adresse e-maiL déjà éxiste' });

  } else if(verifMail == 0 && verifPhone == 1){res.json({message:'numero mobile déjà existé'})}
  else if(verifMail == 1 && verifPhone == 1){res.json({message:'adresseMail et numero Mobile déjà éxisté'})}
else{
Institutions.create({
        nom:nom,
       
        nombreSalarie:nombreSalarie,
        logo:logo,
        email:email,
        motDePasse:motDePasse,
        presentation:presentation,
        telephone:telephone,
        Identifiant:[email,telephone],
        domaine:domaine,
        code:code,
        statusCompte:"VALID",
        typeEtablisment:typeEtablisment,
        OffreEmploie:[{
        idOffreEmploie:idOffreEmploie,
        }],

        LocalisationInstitution:[{
        
        ville:ville,
        adresse:adresse,
        }],

        FormationInstitution:[{
        idFormation:idFormation,
        }],

         AvisInsitutions:[{
        idUtilisateurAvis:idUtilisateurAvis,
        nomUtlisateurAvis:nomUtlisateurAvis,
        commentaireAvis:commentaireAvis,
        noteAvis:noteAvis,
        }],

        EventEntreprise:[{
          idEvenement:idEvenement,

        }],
    }
).exec(function (err, institution){
  if (err) { return res.serverError(err); }
 function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
 

var code = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

institution.code=code;
institution.save();

  var mail = {
          from: "keymada17@gmail.com",
          to: email,
          subject: "Code de confirmation pour votre compte institutions KeyMada",
          html: "<p> Voici votre code : "+code+"</p>"
        }

res.header("Access-Control-Allow-Origin", "*");

smtpTransport.sendMail(mail, function(error, response){
          if(error){
            console.log("Erreur lors de l'envoie du mail!");
            console.log(error);
            res.json({message:"Erreur lors de l'envoie du mail,veuillez le ressayer"})
          }else{

            console.log("Mail envoyé avec succès!")
            res.json({message:"email de confirmation"})
          }
          smtpTransport.close();
        });

 // res.json({ message: 'OK'});
});


  }
    });
  }); //Fin fct count

  },

//publier offre

  createOffre: function (req, res) {


    let 
    
    tags= req.param('tags').replace(/\s/g, '').split(",");
    typeContrat=req.param('typeContrat'),
    titreEmploie=req.param('titreEmploie'),
    id=req.param('id');// identificateur institutions Obect Id
    profilsRequis=req.param('profilsRequis'),
    idUtilisateurPostule=req.param('idUtilisateurPostule');
    cv=req.param('cv');
    lm=req.param('lm');
    dateLimite=req.param('dateLimite');


Institutions.findOne({
  id:id
}).exec(function (err, institution){
  if (err) {
    return res.serverError(err);
  }
  if (!institution) {
    return res.notFound('Could not find Finn, sorry.');
  }
   var a= institution.OffreEmploie.length;
   var name=institution.nom;
   var domaine=institution.domaine;
   
   console.log(a);
   institution.OffreEmploie.push({idOffreEmploie:a});

    institution.save(function (err) {  });

    Emploies.create({
        
      nomInstitution:name,
      status:"TRUE",
      titreEmploie:titreEmploie,
      typeContrat:typeContrat,
      profilsRequis:profilsRequis,
      domaine:domaine,
      tags:tags,
      dateLimite:dateLimite,
      idOffreEmploie:a,
      idInstitution:id,
      Postuler:[{

          idUtilisateurPostule:idUtilisateurPostule,
          cv:cv,
          

      }]

    }
).exec(function (err, Emploie){
  if (err) { return res.serverError(err); }

  console.log("OK");
});
res.json({ message: 'Bien ajouter :) '});
});
   
  },
  

//publier événement
  createEvenement: function (req, res) {


    let 
    
    tags= req.param('tags').replace(/\s/g, '').split(",");
    nomEvenement=req.param('nomEvenement'),
    photoEvenement=req.param('photoEvenement'),
    lieuEvenement=req.param('lieuEvenement'),
    detailsEvenement=req.param('detailsEvenement'),
    dateDebut=req.param('dateDebut'),
    genreEvenement=req.param('genreEvenement'),
    dateFin=req.param('dateFin'),
    heureDebut=req.param('heureDebut'),
    heureFin=req.param('heureFin'),
    idUtilisateurParticipant=req.param('idUtilisateurParticipant'),
    id=req.param('id');// identificateur institutions Obect Id
    


Institutions.findOne({
  id:id
}).exec(function (err, institution){
  if (err) {
    return res.serverError(err);
  }
  if (!institution) {
    return res.notFound('Could not find Finn, sorry.');
  }
   var a= institution.EventEntreprise.length;
   var name=institution.nom;
   

   var ville=institution.LocalisationInstitution[0].ville;
   var adresse=institution.LocalisationInstitution[0].adresse;
   
   console.log(institution.LocalisationInstitution[0].ville);
   institution.EventEntreprise.push({idEvenement:a});

    institution.save(function (err) {  });

    Evenements.create({
        
      nomInstitution:name,
      status:"TRUE",
      nomEvenement:nomEvenement,
      photoEvenement:photoEvenement,
      lieuEvenement:lieuEvenement,
      genreEvenement:genreEvenement,
      detailsEvenement:detailsEvenement,
      ville:ville,
      adresse:adresse,
      tags:tags,
      idEvenement:a,
      idInstitution:id,
      Participant:[{

idUtilisateurParticipant:idUtilisateurParticipant,
          
          }]

    }
).exec(function (err, Emploie){
  if (err) { return res.serverError(err); }

  console.log("OK");
});
res.json({ message: 'Bien ajouter :) '});
});
   
  },
  //utilisateur poster offre
postuleOffre: function (req, res) {


    let 
   
       idUtilisateurPostule= req.param('idUtilisateurPostule'),
          cv= req.param('cv'),
                id=req.param('id'); // identificateur emploie à postuler Object Id 


Emploies.findOne({
  id:id
}).exec(function (err, emploie){
  if (err) {
    return res.serverError(err);
  }
  if (!emploie) {
    return res.notFound('Could not find Finn, sorry.');
  }


  Utilisateurs.findOne({
  id: idUtilisateurPostule
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find Finn, sorry.');
  }

var verif = utilisateur.emploieMatch.filter(function(value){ return value.idEmploieMatch == id;})

console.log(verif.length);

var out=verif.length;

if(out ==0){ 

utilisateur.emploieMatch.push({idEmploieMatch:id });

 utilisateur.save(function (err) {  });


      emploie.Postuler.push({idUtilisateurPostule:idUtilisateurPostule, cv:cv});

            emploie.save(function (err) {  });

      console.log(emploie);
      res.json({ message: 'bien ENREGISTRER'});

   } else


res.json({ message: 'Vous avez déjà postuler sur cette offre'});

});

    });
   
  },


  participeEvenement: function (req, res) {


    let 
   
       idUtilisateurParticipant= req.param('idUtilisateurParticipant'),
          id=req.param('id'); // identificateur evenement à participer Object Id 


Evenements.findOne({
  id: id
}).exec(function (err, event){
  if (err) {
    return res.serverError(err);
  }
  if (!event) {
    return res.notFound('Could not find Finn, sorry.');
  }

//MISE A JOUR EVENEMENT MATCH dans la collection utilisateurs
Utilisateurs.findOne({
  id: idUtilisateurParticipant
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find Finn, sorry.');
  }

var verif = utilisateur.evenementMatch.filter(function(value){ return value.idEvenementMatch == id;})

console.log(verif.length);

var out=verif.length;

if(out ==0){ 

utilisateur.evenementMatch.push({idEvenementMatch:id });

 utilisateur.save(function (err) {  });



   event.Participant.push({idUtilisateurParticipant:idUtilisateurParticipant });
      event.save(function (err) {  });

      console.log(event);
      res.json({ message: 'bien ENREGISTRER'});

   } else

/*var i=0;
for (i; i<utilisateur.evenementMatch.length; i++)
    for (var name in utilisateur.evenementMatch[i]) {
        console.log("idEvnemenetParticipe: "+utilisateur.evenementMatch);
        
    }*/
res.json({ message: 'Vous avez déjà matché sur cette evenement'});


//res.json({ message: "Evenement bien matché"});

});







//res.json({ message: event});
});


   
  },
//Mofidication contenu offre

UpdateOffreInstituions: function (req, res) {

let 
    titreEmploie = req.param('titreEmploie'),
   
    idInstitution=req.param('idInstitution'),

    typeContrat=req.param('typeContrat'),
    idOffreEmploie=req.param('idOffreEmploie'),

    tags= req.param('tags').replace(/\s/g, '').split(","),
    
    profilsRequis=req.param('profilsRequis');

 Emploies.find({idInstitution:idInstitution, idOffreEmploie:idOffreEmploie}).exec(function(err,emploie){
    if (err)  {
      return res.json({error:'true'});
    }
    

   emploie[0].titreEmploie=titreEmploie;
   emploie[0].tags=tags;
   emploie[0].typeContrat=typeContrat;
   emploie[0].profilsRequis=profilsRequis;
   emploie[0].save(function (err) {  });

    
res.json({ message: emploie});
  }); 


   
  },


   
   findOffre: function (req, res) {


    let 
   
    OffreEmploie = [],
    id_entreprise=req.param('id_entreprise');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
 
res.json({ message: entreprise.OffreEmploie[2].Postuler});
});
   
  },

   findEmploie: function (req, res) {


    let 
   
    id_offre=req.param('id_offre');
    id_entreprise=req.param('id_entreprise');

 /* var criteria = _.mapValues(req.query, function(val) {

    {id_offre: {contains:id_offre} id_entreprise: {contains: id_entreprise}}
    return {contains: val};
  })*/
  // criteria is {campaignID: {contains:'foo'}, cell: {contains: '42'}}
  Emploie.find({id_offre:id_offre, id_entreprise:id_entreprise}).exec(function(err,data){
    if (err)  {
      return res.json({error:'true'});
    }
    res.json(data);
  }); 
   
  },

  deleteOffreInstitutions: function (req, res) {


    let 
   
    idOffreEmploie=req.param('idOffreEmploie'); // identificateur AI pérsonnaliser 
    idInstitution=req.param('idInstitution'); // Object id par MongoDb 

    Emploies.find({idInstitution:idInstitution, idOffreEmploie:idOffreEmploie}).exec(function(err,data){
    if (err)  {
      return res.json({error:'true'});
    }
    
      data[0].status= "FALSE";
  data[0].save(function (err) { });

    res.json({message:data});
  }); 
   
  },

//listé offre d'un institution en cours en précisant son identité
  readOffreInstitutions: function (req, res) {


    let 
   
    idInstitution=req.param('idInstitution'); // identificateur Object ID
    Emploies.find({idInstitution:idInstitution,status:"TRUE"}).exec(function(err,data){
    if (err)  {
      return res.json({error:'true'});
    }
    
      

    res.json(data);
  }); 
   
  },

// listé tous les offres des institutions en cours (instituions connécté)

  readAllOffreInstitutions: function (req, res) {
  
  Emploies.find({status:"TRUE"}).exec(function(err,data){
    if (err)  {
      return res.json({error:'true'});
    }
    res.json(data);
  }); 
   
  },

//methode setNull idOffreEmploie dans la collection institutions
  deleteOffre: function (req, res) {


    let 
    id_offre= req.param('id_offre'),
    id_entreprise=req.param('id_entreprise');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
   
   
 delete entreprise.OffreEmploie[id_offre];


entreprise.save(function (err) {  });
res.json({ message: "Bien supprimer"});


// a= entreprise.OffreEmploie.length;
   //console.log(a);
});


console.log('here');
    
  },


  /**
   * `EntrepriseController.find()`
   */
 
finde: function (req, res) {
    Entreprise.find({},{nom:"HasinaSpexeSociete"}).exec(function (err, entreprise) {
      if (err) {
        res.send(400);
      } else {
         res.header("Access-Control-Allow-Origin", "*");
        res.json({results: entreprise.location});

      }
    });
  },
  createFormation: function (req, res) {


    let 
    
    tags= req.param('tags').replace(/\s/g, '').split(",");
    nomFiliere=req.param('nomFiliere'),
    typeFormation=req.param('typeFormation'),
    id=req.param('id');// identificateur institutions Obect Id
    lieuDeFormation=req.param('lieuDeFormation');
    diplomeDeLivre=req.param('diplomeDeLivre');
    idUtilisateurFormation=req.param('idUtilisateurFormation');
    dateDebutFormation=req.param('dateDebutFormation');
    dateFinFormation=req.param('dateFinFormation');

  


Institutions.findOne({
  id:id
}).exec(function (err, institution){
  if (err) {
    return res.serverError(err);
  }
  if (!institution) {
    return res.notFound('Could not find Finn, sorry.');
  }
   var a= institution.FormationInstitution.length;
   var name=institution.nom;
   var domaine=institution.domaine;
   var ville=institution.LocalisationInstitution[0].ville;
   var type= institution.typeEtablisment;
   console.log(a);
   institution.FormationInstitution.push({idFormation:a});

    institution.save(function (err) {  });

    Formations.create({
        
      nomInstitution:name,
      ville:ville,
      diplomeDeLivre:diplomeDeLivre,
      typeFormation:typeFormation,
      nomFiliere:nomFiliere,
      lieuDeFormation:lieuDeFormation,
      domaine:domaine,
      tags:tags,
      status:"VALID",
      typeEtablisment:type,
      dateDebutFormation:dateDebutFormation,
      dateFinFormation:dateFinFormation,
      idFormation:a,
      idInstitution:id,
      Participant:[{

          idUtilisateurFormation:idUtilisateurFormation,
    
        }]

    }
).exec(function (err, Emploie){
  if (err) { return res.serverError(err); }

  console.log("OK");
});
res.json({ message: 'Bien ajouter :) '});
});
   
  },



UpdateEvenementsInstitutions: function (req, res) {

let 
    lieuEvenement = req.param('lieuEvenement'),
   
    nomEvenement=req.param('nomEvenement'),

    photoEvenement=req.param('photoEvenement'),
    
    idEvenement=req.param('idEvenement'),

    tags= req.param('tags').replace(/\s/g, '').split(","),

    dateFin=req.param('dateFin'),
    
    dateDebut=req.param('dateDebut'),

    idInstitution=req.param('idInstitution'),
  
    heureFin=req.param('heureFin'),

    heureDebut=req.param('heureDebut'),

    detailsEvenement=req.param('detailsEvenement'),
    genreEvenement=req.param('genreEvenement');
 


 Evenements.find({idInstitution:idInstitution, idEvenement:idEvenement}).exec(function(err,evenement){
    if (err)  {
      return res.json({error:'true'});
    }
    

   evenement[0].lieuEvenement=lieuEvenement;
   evenement[0].tags=tags;
   evenement[0].photoEvenement=photoEvenement;
   evenement[0].dateDebut=dateDebut;
   evenement[0].dateFin=dateFin;
   evenement[0].heureDebut=heureDebut;
   evenement[0].heureFin=heureFin;
   evenement[0].detailsEvenement=detailsEvenement;
   evenement[0].genreEvenement=genreEvenement;
   



   evenement[0].save(function (err) {  });

    
res.json({ message: evenement});
  }); 


   
  },


};

