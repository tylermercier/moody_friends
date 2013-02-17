config = require('../../config/index')

describe 'config', ->
  beforeEach ->
    @app =
      configure: ->
      set: ->
      use: ->

  describe '#init', ->
    it 'should require auth', ->
      config(@app)
      expect(@app.requireAuth).to.equal(true)
