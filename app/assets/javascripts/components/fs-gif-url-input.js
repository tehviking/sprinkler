App.FsGifUrlInputComponent = Ember.Component.extend({
  template: Ember.TEMPLATES["components/fs-gif-url-input"],
  gifUrl: null

});

$(document).ready(function(){
  $(".gif-url-input-container").each(function(){
    App.FsGifUrlInputComponent.create().appendTo(this);
    console.log(Ember.TEMPLATES)
  });
});
