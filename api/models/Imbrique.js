/**
 * Imbrique.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	item: {type: 'string'},
    qty: {type: 'integer'},
    

     h:{type:'integer'},

     w:{type: 'integer'}, 

     uom:{type: 'string'},
 
    status: {type: 'string'},

  }
};

