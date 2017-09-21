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
* It will create a new user .
*/
create: function (req, res) {
res.header("Access-Control-Allow-Origin", "*");
let  nomUtilisateur = req.param('nomUtilisateur'),
      prenomUtilisateur = req.param('prenomUtilisateur'),
           anneNaissance = req.param('anneNaissance'),
              sexe= req.param('sexe'),

              centreInteret=req.param('centreInteret').replace(/\s/g, '').split(","),


 institutionSuivi=req.param('institutionSuivi'),
  
              
  photoUtilisateur= req.param('photoUtilisateur'),
   numeroMobile= req.param('numeroMobile'),
    adresseMail= req.param('adresseMail'),
      motDePasse= req.param('motDePasse'),
        idEntrepriseSuivi=req.param('idEntrepriseSuivi'),
    localisation= req.param('localisation'),
      aPropos= req.param('aPropos'),
        poste= req.param('poste'),
        code=req.param('code'),
  nomSociete= req.param('nomSociete'),
      diplome = req.param('diplome'),
          filiere= req.param('filiere'),
            nomEtablissement= req.param('nomEtablissement'),
  
    idEvenementMatch= req.param('idEvenementMatch'),
    idEvenementSauvegarde= req.param('idEvenementSauvegarde'),
    idFormationSauvarde= req.param('idFormationSauvarde'),
    idEmploieMatch= req.param('idEmploieMatch'),
    idEmploieSauvegarde= req.param('idEmploieSauvegarde'),
    idUtilisateurMatch= req.param('idUtilisateurMatch'),
    idUtilisateurBloque= req.param('idUtilisateurBloque'),

    cv= req.param('cv');

    var age= (new Date()).getFullYear() - anneNaissance;

Utilisateurs.count({Identifiant:adresseMail}).exec(function countCB(error, found) {
  
  Utilisateurs.find({numeroMobile:numeroMobile}).exec(function (err, phone){

var verifPhone=phone.length;


  var verifMail= +found;
  console.log(found);



  if(verifMail == 1 && verifPhone == 0){
 res.header("Access-Control-Allow-Origin", "*"); res.json({ message: 'Adresse e-maiL déjà éxiste' });

  } else if(verifMail == 0 && verifPhone == 1){res.json({message:'numero mobile déjà existé'})}
  else if(verifMail == 1 && verifPhone == 1){res.json({message:'adresseMail et numero Mobile déjà éxisté'})}
else{

Utilisateurs.create({
nomUtilisateur: nomUtilisateur,
prenomUtilisateur : prenomUtilisateur,
anneNaissance:anneNaissance,
adresseMail:adresseMail,
sexe:sexe,
age:age,
localisation:localisation,
motDePasse:motDePasse,
photoUtilisateur:[photoUtilisateur],
numeroMobile:numeroMobile,
code:code,
statusCompte:"VALIDE",

aPropos:aPropos,
centreInteret:centreInteret,
Identifiant:[adresseMail,numeroMobile],

informationEmploie: [{
  nomSociete:nomSociete,
  poste:poste,

}],

derniereFormation: [{
  diplome:diplome,
  filiere:filiere,
  nomEtablissement:nomEtablissement,


}],
evenementMatch: [{
  idEvenementMatch:idEvenementMatch,
 

}],
 
 institutionSuivi:[{idInstitution:institutionSuivi}],

evenementSauvegarde: [{
  idEvenementSauvegarde:idEvenementSauvegarde,
 

}],

formationSauvagrde: [{
idFormationSauvarde:idFormationSauvarde,

}],

emploieMatch: [{
  idEmploieMatch:idEmploieMatch,


}],

emploieSauvegarde: [{
  idEmploieSauvegarde:idEmploieSauvegarde,


}],

utilisateurMatch: [{
  idUtilisateurMatch:idUtilisateurMatch,
}],

utilisateurBloque: [{
  idUtilisateurBloque:idUtilisateurBloque,


}],
cv: [{
  cv:cv,


}],


}).exec(function (err, utilisateur){
  if (err) { return res.serverError(err); }
 function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
 

var code = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

utilisateur.code=code;
utilisateur.save();

  var mail = {
          from: "keymada17@gmail.com",
          to: adresseMail,
          subject: "Code de confirmation compte KeyMada",
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

//res.json({ message: 'OK', token: jwToken.issue({id: utilisateur.id})});
});




}
});
}); //Fin fct count



},
/*

res.header("Access-Control-Allow-Origin", "*");
res.json({ message: 'OK', token: jwToken.issue({id: _utilisateur.id})});

*/
findAll: function (req, res) {
    Utilisateurs.find().exec(function (err, utilisateur) {
      if (err) {
        res.send(400);
      } else {
         res.header("Access-Control-Allow-Origin", "*");
        res.json({utilisateur});

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


AcceuilUtilisateur: function (req, res) {


    let  id=req.param('id');


Utilisateurs.findOne({
  id:id
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find Finn, sorry.');
  }

var tags=utilisateur.centreInteret;
    var localisation=utilisateur.localisation;
console.log(tags.length);

if(tags.length==0){

 Evenements.find({ville: localisation}).exec(function(err, evenement) {


       res.json({evenement});
    });


} else{
    Emploies.find({tags: tags}).exec(function(err, results) {


       res.json({results});
    });
    }


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

findTags: function(req,res){
res.header("Access-Control-Allow-Origin", "*");
var twilio = require('twilio');
 

var client = new twilio('ACad288269f357630c5fbc0aa4ca3f0b83', '94532e0195736d640641d0bb2fb0b256');
 
client.messages.create({
    to:'+261349911706',
    from:'+14245238505',
    body:'Hello KDBR'
}, function(error, message) {
    
    if (!error) {
        
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {

      console.log(error);
        console.log('Oops! There was an error.');
    }
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