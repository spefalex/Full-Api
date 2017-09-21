module.exports = {
  index: function (req, res) {
    var eMail = req.param('eMail');
    var motDePasse= req.param('motDePasse');
    var code=req.param('code');

   

  Utilisateurs.findOne({Identifiant: [eMail]}, function (err, user) {
      if (!user) {

        console.log(user);
        return res.json(401, {err: 'invalid email ou password'});

      }

if(user.code == '') {
      Utilisateurs.comparePassword(motDePasse, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'interdit'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email ou password'});
        } else {
          res.json({
             user: user.id,
            token: jwToken.issue({message:'OK'})
          });
        }
      });
} else{
  
   return res.json({message:"Vous n'avez pas activé votre compte, veuillez consulter votre é mail"});
}
  
  })
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
