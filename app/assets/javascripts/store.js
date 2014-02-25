// The stuff below is all for Ember Data:

// Overwrite ajax to be able to use nice ic-ajax fixtures
// Use the ActiveModel::Serializers adapter which wraps RESTAdapter
App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  ajax: function(url, type, options) {
    options = this.ajaxOptions(url, type, options);
    return ic.ajax(options);
  }
});

// Use the ActiveModel::Serializers adapter
// This basically just turns stuff like user_name to userName & back
App.ApplicationSerializer = DS.ActiveModelSerializer.extend({});

// Insert CSRF token for AJAX requests
$(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxPrefilter(function(options, originalOptions, xhr) {
    return xhr.setRequestHeader('X-CSRF-Token', token);
  });
});
