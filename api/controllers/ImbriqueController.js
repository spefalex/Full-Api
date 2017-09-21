/**
 * ImbriqueController
 *
 * @description :: Server-side logic for managing Imbriques
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `ImbriqueController.create()`
   */
  create: function (req, res) {
    
    let item = req.param('item'),
		quantity = req.param('quantity'),
		size_h= req.param('size_h');
		size_w= req.param('size_w');
		size_unity= req.param('size_unity');
		status= req.param('status');
		
    Imbrique.create({
    	item:item,
    	qty:quantity,
    	size:{ h: size_h , w:size_w, uom:size_unity},
    	status:status,


    }




    	).exec(function (err, Imbrique){
  if (err) { return res.serverError(err); }

  res.json({ message: 'OK'});
});
  
  },


  /**
   * `ImbriqueController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  findAll: function (req, res) {
    Imbrique.find().exec(function (err, imbrique) {
      if (err) {
        res.send(400);
      } else {
         res.header("Access-Control-Allow-Origin", "*");
        res.json({imbrique});

      }
    });
  },
};

