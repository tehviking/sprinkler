App.GifDetailsRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.Object.create({id: params.id})
  }
});
