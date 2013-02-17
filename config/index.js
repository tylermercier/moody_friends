module.exports = function(app) {
  app.requireAuth = true;

  require('./express')(app);
  require('./passport')(app);
  require('./environments')(app);
}
