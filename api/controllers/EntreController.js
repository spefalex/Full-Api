/**
 * EntrepriseController
 *
 * @description :: Server-side logic for managing Entreprises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  


  /**
   * `EntrepriseController.create()`
   */
  createEntreprise: function (req, res) {

    let nom = req.param('nom'),
    localisation = req.param('localisation'),
    domaine= req.param('domaine'),
    nom_offre = req.param('nom_offre'),
    nom_entreprise= req.param('nom_entreprise'),
    nom_event= req.param('nom_event'),
    date_debut= req.param('date_debut'),
    date_fin= req.param('date_debut'),
    id_offre=req.param('id_offre'),
    id_user=req.param('id_user'),
    lm=req.param('lm'),
    cv=req.param('cv');

Entreprise.create({
        nom:nom,
        localisation:localisation,
        
        domaine:domaine,
        OffreEmploie:[{
        id_offre:id_offre,
        }],

        EventEntreprise:{
          nom_event:nom_event,
          date_debut:date_debut,
          date_fin:date_fin,

        },
    }
).exec(function (err, Entreprise){
  if (err) { return res.serverError(err); }

  res.json({ message: 'OK'});
});
  },

  createOffre: function (req, res) {


    let 
    contenu_offre = req.param('contenu_offre'),
    tags= req.param('tags'),
    domaine=req.param('domaine'),
    id_entreprise=req.param('id_entreprise');
    id_user=req.param('id_user');
    cv=req.param('cv');
    lm=req.param('lm');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
   var a= entreprise.OffreEmploie.length;
   var name=entreprise.nom;
   
   console.log(a);
   entreprise.OffreEmploie.push({id_offre:a});

    entreprise.save(function (err) {  });

    Emploie.create({
      
      nom_entreprise:name,
      status:"TRUE",
      contenu_offre:contenu_offre,
      domaine:domaine,
      tags:tags,
      id_offre:a,
      id_entreprise:id_entreprise,
      Postuler:[{

          id_user:id_user,
          cv:cv,
          lm:lm,

      }]

    }
).exec(function (err, Emploie){
  if (err) { return res.serverError(err); }

  console.log("OK");
});
res.json({ message: 'Bien ajouter :) '});
});
   
  },
  
  postuleOffre: function (req, res) {


    let 
   
       id_user= req.param('id_user'),
          lm = req.param('lm'),
             cv= req.param('cv'),
                id=req.param('id');


Emploie.findOne({
  id: id
}).exec(function (err, emploie){
  if (err) {
    return res.serverError(err);
  }
  if (!emploie) {
    return res.notFound('Could not find Finn, sorry.');
  }
//var a= entreprise.OffreEmploie.length;
   emploie.Postuler.push({id_user:id_user, lm:lm,cv:cv});

    emploie.save(function (err) {  });
res.json({ message: emploie});
});
   
  },
  createOffr: function (req, res) {


    let 
    nom_offre = req.param('nom_offre'),
    nom_entreprise= req.param('nom_entreprise'),
    OffreEmploie = [],
    id_entreprise=req.param('id_entreprise');
    id_user=req.param('id_user'),
    lm=req.param('lm'),
    cv=req.param('cv');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
   var a= entreprise.OffreEmploie.length;
  
   var name = entreprise.nom;
   console.log(a);
   entreprise.OffreEmploie.push({id_offre:a});

     //entreprise.OffreEmploie.push({id_user:id_user, lm:lm,cv:cv});
 //    var b = entreprise.OffreEmploie[a].Postuler;
   //   b.({id_user:id_user, lm:lm, cv:cv});

    entreprise.save(function (err) {  });
res.json({ message: entreprise.OffreEmploie});
});
   
  },

  updateOffre: function (req, res) {


    let 
    nom_offre = req.param('nom_offre'),
   
    id_entreprise=req.param('id_entreprise'),

    id_offre=req.param('id_offre');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
  
   entreprise.OffreEmploie[id_offre].nom_offre=nom_offre;
 //entreprise.OffreEmploie.assign([id_offre], [], {nom_offre: nom_offre});
/*var ligne=entreprise.OffreEmploie.length;
  console.log(ligne);
for(var i=0; i<ligne; i++) {

  if (entreprise.OffreEmploie[i] == id_offre) {
    console.log(entreprise.OffreEmploie[i] );
    entreprise.OffreEmploie[i].push({ nom_offre:nom_offre });
   
    break;
  }

}*/
 entreprise.save(function (err) {  });

    
res.json({ message: entreprise.OffreEmploie[id_offre].nom_offre});
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

  delEmploie: function (req, res) {


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
    
      data[0].status= "FALSE";
      data[0].save(function (err) { });

    res.json({message:"Offre bien supprimer"});
  }); 
   
  },

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


};

