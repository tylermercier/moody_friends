exports.index = function(request, response) {
  response.render('index', {
    title: 'Moody Friends'
  });
};
