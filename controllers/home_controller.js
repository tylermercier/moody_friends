module.exports = function(app){
  function Controller() {}

  Controller.prototype.index = function(request, response) {
    response.render('index', {
      title: 'Moody Friends'
    });
  };

  return new Controller();
};
