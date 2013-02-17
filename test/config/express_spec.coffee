sinon = require('sinon')
config = require('../../config/express')

describe 'config', ->
  beforeEach ->
    @app =
      set: ->
      use: ->

  describe 'express', ->
    it 'should set the view engine and view path', ->
      mock = sinon.mock(@app)
      mock.expects("set").withArgs('views').once()
      mock.expects("set").withArgs('view engine', 'jade').once()

      config(@app)

      mock.verify()
