/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
'POST /user': 'UserController.create',
'POST /utilisateurs/Inscrire': 'UtilisateursController.create',
'GET /testTag': 'UtilisateursController.findTags',
'POST /institutions/Inscrire': 'InstitutionsController.createInstitution',
'POST /Nouveau/Offre': 'InstitutionsController.createOffre',
'POST /Nouveau/Evenement': 'InstitutionsController.createEvenement',
'POST /Nouveau/Formation': 'InstitutionsController.createFormation',
'POST /Participe/Evenement': 'InstitutionsController.participeEvenement',
'GET /lire/Utlisateurs': 'UtilisateursController.findAll', 
'GET /supprimer/Offre': 'InstitutionsController.deleteOffreInstitutions',

'PUT /miseAjour/Offre': 'InstitutionsController.UpdateOffreInstituions',
'PUT /miseAjour/Evenements': 'InstitutionsController.UpdateEvenementsInstitutions',

'GET /lire/Offre': 'InstitutionsController.readAllOffreInstitutions',
'GET /lire/Offre/institutions': 'InstitutionsController.readOffreInstitutions',
'POST /postule/offre': 'InstitutionsController.postuleOffre',
'GET /find': 'UserController.findAll',
'GET /findAll': 'ImbriqueController.findAll',
'GET /count': 'UserController.findCount',
'GET /cherche': 'UserController.findName',
'POST /update/:id': 'UserController.Update',
'GET /delete/:id': 'UserController.Delete',
'POST /Login': 'UserController.LoginSprint',
'POST /Chati': 'ChatController.addConv',
'POST /Log': 'AuthController.index',
'POST /Log/Confirmation': 'AuthController.Confirmation',
'POST /Insert': 'ImbriqueController.create',
'POST /InsertEntreprise': 'EntreController.createEntreprise',
'POST /InsertOffre': 'EntreController.createOffre',
'POST /postuleOffre': 'EntreController.postuleOffre',
'POST /deleteOffre': 'EntrepriseController.deleteOffre',
'POST /updateOffre': 'EntrepriseController.updateOffre',
'GET /findOffre': 'EntrepriseController.findOffre',
'GET /finde': 'EntrepriseController.finde',
'GET /findEmploie': 'EntreController.findEmploie',
'GET /delEmploie': 'EntreController.delEmploie',

'GET /Acceuil/Utilisateur': 'UtilisateursController.AcceuilUtilisateur',




};
