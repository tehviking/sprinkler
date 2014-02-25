App.FsDropdownSelectComponent = Ember.Component.extend({
  layoutName: "components/fs-dropdown-select",
  tagName: "dl",
  classNames: ["fs-dropdown"],
  classNameBindings: ["active"],

  setupBindings: function() {
    if (Ember.isEmpty(this.get("buttonText"))) {
      Ember.Binding.from("value.name").to("buttonText").oneWay().connect(this);
    }
  }.on("init"),

  //// KEYBINDINGS ////
  // 38: Up arrow
  // 40: Down arrow
  // 13: Enter
  keyDown: function(e) {
    if (e.keyCode === 38) {
      e.preventDefault();
      this.highlightPreviousItem();
    } else if (e.keyCode === 40) {
      e.preventDefault();
      this.highlightNextItem();
    } else if (e.keyCode === 13) {
      this.send("select", this.get("highlightedItem"));
    }
  },

  //// PROPERTIES ////

  // records is the array of injected selectable elements.
  records: null,

  // active denotes whether the dropdown menu is open or not
  active: false,

  // text to be displayed on a button by default
  buttonText: null,

  // Parent is for when there's a specific sub-item of a controller the dropdown
  // needs to act on (e.g. a specific TimesheetEntry)
  parent: null,

  //// COMPUTED PROPERTIES ////

  // itemList wraps each injected record in the Item view model.
  itemList: Ember.computed.map("records", function(record){
    var item = null;
    if (!!record && typeof record === 'object') {
      if (!record.getProperties) {
        item = this.Item.create(record);
      } else {
        item = this.Item.create(record.getProperties(["name", "value"]));
      }
    } else if (!!record) {
      // Should this move into the Item object?
      item = this.Item.create({name: record.toString()});
    }
    if (!item.get("value")) {
      item.set("value", record)
    }
    return item
  }),

  // selectedItem contains the selected item in the list
  selectedItem: function(){
    return this.get("itemList").findBy("selected");
  }.property("itemList.@each.selected"),

  // highlighted item in list for key navigation
  highlightedItem: function(){
    return this.get("itemList").findBy("highlighted");
  }.property("itemList.@each.highlighted"),

  //// ACTIONS ////

  actions: {
    // Open or close the dropdown list
    toggleDropdown: function(){
      this.toggleProperty("active");
      return this.$().attr({ tabindex: 1 }), this.$().focus();
    },

    // set `selected` on an item and call a passed-in action on the parent context
    select: function(newSelectedItem){
      var currentSelection = this.get("selectedItem");
      if (!!currentSelection) {
        this.get("selectedItem").set("selected", false);
      }
      newSelectedItem.set("selected", true);
      this.send("toggleDropdown");
      this.$().blur();
      this.set("value", newSelectedItem.get("value"));
      this.sendAction("action", newSelectedItem.get("value"));
    },
  },

  //// HELPER FUNCTIONS ////

  // Highlight the previous item, or the last one, if none exist.
  // Once you reach the beginning of the list, circle back around.
  highlightPreviousItem: function() {
    if (!!this.get("itemList")) {
      if (!this.get("highlightedItem")) {
        this.get("itemList.lastObject").set("highlighted", true);
      } else {
        var index = this.get("itemList").indexOf(this.get("highlightedItem"))
        var previousItem = this.get("itemList").objectAt(index - 1)
        this.get("highlightedItem").set("highlighted", false)
        if (!!previousItem) {
          previousItem.set("highlighted", true)
        } else {
          this.get("itemList.lastObject").set("highlighted", true)
        }
      }
    }
  },

  // Highlight the next item, or the first one, if none exist.
  // Once you reach the end of the list, circle back around.
  highlightNextItem: function() {
    if (!!this.get("itemList")) {
      if (!this.get("highlightedItem")) {
        this.get("itemList.firstObject").set("highlighted", true);
      } else {
        var index = this.get("itemList").indexOf(this.get("highlightedItem"))
        var nextItem = this.get("itemList").objectAt(index + 1)
        this.get("highlightedItem").set("highlighted", false)
        if (!!nextItem) {
          nextItem.set("highlighted", true)
        } else {
          this.get("itemList.firstObject").set("highlighted", true)
        }
      }
    }
  },

  //// VIEW MODELS ////

  // Wrap each record with presentation logic, e.g `selected`, `highlighted`
  Item: Ember.Object.extend({
    selected: false,
    highlighted: false,
    value: null
  })
});

$(document).ready(function(){
  $(".dropdown-component-container").each(function(){
    var component = App.FsDropdownSelectComponent.create({
      records: ["foo", "bar"],
      buttonText: "Select"
    });
    component.replaceIn(this);
  });
});
