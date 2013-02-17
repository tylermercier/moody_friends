describe "Matchers", ->
  it "compare type", ->
    expect(true).to.be.a('boolean')

  it "compare equality", ->
    expect('foo').to.equal('foo')

  it "check property", ->
    expect("foo").to.have.length(3)

  it "compare properties the long way", ->
    expect(flavors: "foo")
      .to.have.property('flavors')
      .with.length(3)
