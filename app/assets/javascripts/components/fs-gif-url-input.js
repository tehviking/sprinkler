App.FsGifUrlInputComponent = Ember.Component.extend({
  templateName: "components/fs-gif-url-input",
  gifUrl: null,
});

$(document).ready(function(){
  $(".gif-url-input-container").each(function(){
    var component = App.FsGifUrlInputComponent.create();
    component.replaceIn(this);
  });
});
