App.Router.map(function(){
  this.route("gifDetails", {path: "gif_links/:id/details"})
});

App.Router.reopen({
  location: 'history'
});
