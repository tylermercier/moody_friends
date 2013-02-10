var user = require('../models/user');

exports.index = function(request, response) {
  response.render('index', {
    title: 'User list'
  });
};
