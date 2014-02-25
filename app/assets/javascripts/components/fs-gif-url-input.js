App.FsGifUrlInputComponent = Ember.Component.extend({
  layoutName: "components/fs-gif-url-input",
  gifUrl: null,

  urlIsValid: function(){
    if(!!this.get("gifUrl")) {
      return this.get("gifUrl").match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
    }
  }.property("gifUrl")
});

$(document).ready(function(){
  // Find the container div.
  $(".url-input-component-container").each(function(){
    // Get the existing input value
    var value = $(this).find("input").val()
    // Build the component & stuff in any pre-existing value
    var component = App.FsGifUrlInputComponent.create({
      gifUrl: value
    });
    // Gut out the container div & replace with the component
    component.replaceIn(this);
  });
});
