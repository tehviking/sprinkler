chai.Assertion.includeStack = true
Ember.testing = true
Ember.Test.adapter = Ember.Test.MochaAdapter.create()
App.setupForTesting()
App.injectTestHelpers()

window.start = ->
window.stop = ->

beforeEach ->
  App.reset()
  @store = App.__container__.lookup("store:main")
