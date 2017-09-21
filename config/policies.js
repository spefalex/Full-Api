
module.exports.policies = {

  '*': ['isAuthorized'], // Everything resctricted here
  'UserController': {
    '*': true // We dont need authorization here, allowing public access
  },

   'ImbriqueController': {
    '*': true // We dont need authorization here, allowing public access
  },
   'EntrepriseController': {
    '*': true // We dont need authorization here, allowing public access
  },
    'EntreController': {
    '*': true // We dont need authorization here, allowing public access
  },
    'UtilisateursController': {
    '*': true // We dont need authorization here, allowing public access
  },

  'AuthController': {
    '*': true // We dont need authorization here, allowing public access

  },

    'InstitutionsController': {
    '*': true // We dont need authorization here, allowing public access
  }
};