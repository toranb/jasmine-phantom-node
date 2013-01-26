require "static/app/foo"

describe "Coffee Jasmine Demo", ->

  it "should be awesome", ->
    expect(2 + 2).toBe 4

  it "should compile production coffee to js", ->
    foo = new Foo()
    result = foo.doStuff "what"
    expect(result).toEqual "wat"

  it "should compile production coffee to js again", ->
    foo = new Foo()
    result = foo.doStuff ""
    expect(result).toEqual "done"
