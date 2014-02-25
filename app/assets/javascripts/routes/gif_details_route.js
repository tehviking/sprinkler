App.GifDetailsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find("gifLink", params.id)
  }
});
