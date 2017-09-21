module.exports = {
/**
* It will create a nouveau utilisateur .
*/
create: function (req, res) {
res.header("Access-Control-Allow-Origin", "*");
let firstName = req.param('first_name'),
lastName = req.param('last_name'),
anne_naissance = req.param('anne_naissance');
e_mail= req.param('e_mail');
sexe = req.param('sexe');
access_mode= req.param('access_mode');
location = req.param('location');
password= req.param('password');
number_phone=req.param('number_phone');
Apropos = req.param('Apropos');
centre_interet= req.param('centre_interet');
poste = req.param('poste');
nom_societe = req.param('nom_societe');
niveau = req.param('niveau');
filiere = req.param('filiere');
nom_etablisment = req.param('nom_etablisment');
sexe = req.param('sexe');
id_evenement=req.param('id_evenement');
detail_evenement=req.param('detail_evenement');
id_evenement_sauvegarde=req.param('id_evenement_sauvegarde');
detail_evenement_sauvegarde=req.param('detail_evenement_sauvegarde');
id_formation_sauvegarde=req.param('id_formation_sauvegarde');
detail_formation_sauvegarde=req.param('detail_formation_sauvegarde');
id_emploie_match=req.param('id_emploie_match');
detail_emploie_match=req.param('detail_emploie_match');
id_emploie_sauvegarde= req.param('id_emploie_sauvegarde');
detail_emploie_sauvegarde= req.param('detail_emploie_sauvegarde');
id_other_user=req.param('id_other_user');
nom_fichier=req.param('nom_fichier');






if(!firstName){
return res.badRequest({err:'Invalid first_name'});
}
if(!lastName){
return res.badRequest({err:'Invlaid last_name'});
}
  User.count({e_mail:e_mail}).exec(function countCB(error, found) {
       if (error) { return res.serverError(error); } else {
var verif= +found;   if(verif==1){ res.header("Access-Control-Allow-Origin", "*"); res.json({ message: 'MAIL' })}else

User.create({
first_name : firstName,
last_name : lastName,
anne_naissance:anne_naissance,
e_mail:e_mail,
sexe:sexe,
access_mode:access_mode,
location:location,
password:password,
number_phone:number_phone,
Apropos:Apropos,
centre_interet:centre_interet,
emploie: [{
  poste:poste,
  nom_societe:nom_societe,

}],

formation: [{
  niveau:niveau,
  filiere:filiere,
  nom_etablisment:nom_etablisment,

}],
evenemementMatch: [{
  id_evenement:id_evenement,
  detail_evenement:detail_evenement,

}],

evenementSauvegarde: [{
  id_evenement_sauvegarde:id_evenement_sauvegarde,
  detail_evenement_sauvegarde:detail_evenement_sauvegarde,

}],

formationSauvagrde: [{
  id_formation_sauvegarde:id_formation_sauvegarde,
  detail_formation_sauvegarde:detail_formation_sauvegarde,

}],

emploieMatch: [{
  id_emploie_match:id_emploie_match,
  detail_emploie_match:detail_emploie_match,

}],

emploieSauvegarde: [{
  id_emploie_sauvegarde:id_emploie_sauvegarde,
  detail_emploie_sauvegarde:detail_emploie_sauvegarde,

}],

userMatch: [{
  id_other_user:id_other_user,
}],

userBloque: [{
  id_other_user:id_other_user,


}],
userCv: [{
  nom_fichier:nom_fichier,


}],





})
.then(_user => {
if(!_user) return res.serverError({err:'Unable to create user'});
res.header("Access-Control-Allow-Origin", "*");
res.json({ message: 'OK', token: jwToken.issue({id: _user.id})});
})
.catch(err => res.serverError(err.message));


      }
    });





},

findAll: function (req, res) {
    User.find().exec(function (err, user) {
      if (err) {
        res.send(400);
      } else {
         res.header("Access-Control-Allow-Origin", "*");
        res.json({user});

      }
    });
  },

 findCount: function (req, res) {

 	let firstName = req.param('first_name');


    User.count({first_name:req.param('first_name')}).exec(function countCB(error, found) {
       if (error) { return res.serverError(error); } else {
        res.json({found});
      }
    });


  },


saveOffre: function (req, res) {


    let 
   
    OffreEmploie = [],
    id_entreprise=req.param('id_entreprise'),
    id_offre=req.param('id_offre'),
    id_user=req.parama('id_user');


Entreprise.findOne({
  id_entreprise:id_entreprise
}).exec(function (err, entreprise){
  if (err) {
    return res.serverError(err);
  }
  if (!entreprise) {
    return res.notFound('Could not find Finn, sorry.');
  }
 var jsonval= entreprise.OffreEmploie[id_offre];

 
var copy= entreprise.OffreEmploie[id_offre].nom_offre;
var company= entreprise.OffreEmploie[id_offre].nom_entreprise;
console.log(copy);
console.log(company);

res.json({ message: entreprise.OffreEmploie[id_offre].nom_offre});

});
   
  },
 

 Update: function (req, res) {
 
 	User.update({id:req.param('id')},{first_name:req.param('first_name')}).exec(function afterwards(err, updated){
 res.header("Access-Control-Allow-Origin", "*");
  if (err) {
    // handle error here- e.g. `res.serverError(err);
    return;
  }

 // console.log('Updated user to have name ' + updated[0].first_name);
 res.header("Access-Control-Allow-Origin", "*");
 res.json({"message":"mise a jour"});


});

      
  },


   Delete: function (req, res) {
 
 	User.destroy({id:req.param('id')}).exec(function (err){
  res.header("Access-Control-Allow-Origin", "*");
  if (err) {
    res.header("Access-Control-Allow-Origin", "*");
    return res.negotiate(err);
  }
  sails.log('OUF');
  res.header("Access-Control-Allow-Origin", "*");
  res.json({"message":"delete"});

});

      
  },

findName: function(req,res){
res.header("Access-Control-Allow-Origin", "*");
User.find({first_name: req.param('first_name')}).exec(function(err, results) {

var counter=results.length;
 sails.log(counter);


 if(counter==0){ res.json({results:"Not"});} else
res.json({results});


});
},



LoginSprint: function(req,res){
res.header("Access-Control-Allow-Origin", "*");
  let e_mail = req.param('e_mail');
  let mdp = req.param('password');

User.find({e_mail: e_mail}).exec(function(err, results) {

var counter=results.length;
sails.log(counter);


 if(counter==0){  res.header("Access-Control-Allow-Origin", "*"); res.json({message:"Identifiant non trouvé"});} else {

res.header("Access-Control-Allow-Origin", "*");
User.find({e_mail: e_mail}).exec(function(err,data) {
var pass= data.pop().toObject();
var verif= pass.password;

if(verif==mdp){  res.header("Access-Control-Allow-Origin", "*"); res.json({"message":"OK", token: jwToken.issue({id: e_mail}) });} else{  res.header("Access-Control-Allow-Origin", "*"); res.json({"message":"Mauvaise mot de passe"}); }
});

}

});
},
};