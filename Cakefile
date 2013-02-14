{exec} = require "child_process"

task "compile", "compile src coffee into lib js and copy over .dat file", ->
  exec "coffee -cbo lib src", (err) ->
    throw err if err
    console.log "-> coffeescript compiled."

task "spec", "run specs", ->
  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --compilers coffee:coffee-script
    --reporter dot
    --require coffee-script
    --require test/spec_helper.coffee
    --colors
    --recursive
  ", (err, output) ->
    throw err if err
    console.log output
