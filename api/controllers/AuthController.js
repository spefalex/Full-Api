var bcrypt = require('bcrypt-nodejs');
module.exports = {
  index: function (req, res) {
   var eMail = req.param('eMail');
      var motDePasse= req.param('motDePasse');
        var code=req.param('code');
    if (!eMail || !motDePasse) {
      return res.json(401, {err: 'email et password vide'});
    }



Utilisateurs.findOne({
  Identifiant:eMail
}).exec(function (err, utilisateurs){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateurs) {
    return res.json({message:'Identifiant non trouvé'});
  }

 
   bcrypt.compare(motDePasse, utilisateurs.motDePasse, function (err, match) {

      if(err) console.log(err);
      if(match) {

        if(utilisateurs.code == ''){
    return res.json({
             utilisateurs: utilisateurs.id,
            token: jwToken.issue({message:'OK'})
          });} else{ return res.json(401, {message: 'veuillez activé votre compte '}); }
      } else {
        return res.json(401, {err: 'mot de passe incorecte'});
      }
    })
   
  

});

      
  },
 Confirmation: function(req,res){

    var eMail = req.param('eMail');
      var motDePasse= req.param('motDePasse');
        var code=req.param('code');

   

    Utilisateurs.findOne({Identifiant: [eMail]}, function (err, user) {
      if (!user) {

        console.log(user);
        return res.json(401, {err: 'invalid email ou password'});

      }

if(user.code == code){
      Utilisateurs.comparePassword(motDePasse, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'interdit'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email ou password'});
        } else {

          user.code='';
          user.save();
          res.json({
             user: user.id,
            token: jwToken.issue({message:'OK'})
          });
        }
      });
} else{
  
   return res.json({message:"Votre code est incorecte"});
}
  
  })
  }


  
};
