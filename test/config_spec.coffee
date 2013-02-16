express = require('express')
mongoose = require('mongoose')
passport = require('passport')
Config = require('../config')

describe 'config', ->
  beforeEach ->
    @configuration = new Config()
    @app = {
        configure: ->
      }

  describe '#init', ->
    it 'should require auth', ->
      @configuration.init(@app, express, passport, mongoose)
      expect(@app.requireAuth).to.equal(true)

  describe '#initExpress', ->
    xit 'should set view engine to jade', ->
      @configuration.initExpress(@app, express)
      expect(@app.get('view engine')).to.equal('jade')
