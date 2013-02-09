
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.render('index', { title: 'yo yo' });
  //res.send("respond with a resource");
};
