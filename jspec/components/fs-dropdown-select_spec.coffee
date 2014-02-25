describe "TwDropdownSelectComponent", ->
  beforeEach -> Ember.run =>
    @component = App.FsDropdownSelectComponent.create()
    @component.append()
  afterEach -> Ember.run =>
    @component.destroy()

  describe "toggling dropdown", ->
    it "expands the dropdown", ->
      expect(@component.$()).not.to.have.class("active")
      Ember.run => @component.send("toggleDropdown")
      expect(@component.$()).to.have.class("active")

  describe "When options are a flat array", ->
    beforeEach -> Ember.run =>
      @flatArray = ["Richard Hammond", 123]
      @component.set "records", @flatArray
    it "uses toString value as display name", ->
      expect(@component.get("itemList.firstObject.name")).to.equal "Richard Hammond"
      expect(@component.get("itemList.lastObject.name")).to.equal "123"
    it "uses the raw element as the value", ->
      expect(@component.get("itemList.firstObject.value")).to.equal "Richard Hammond"
      expect(@component.get("itemList.lastObject.value")).to.equal 123

  describe "When they have a name attribute", ->
    beforeEach -> Ember.run =>
      @objectWithName = {name: "Dennis Nedry"}
      @component.set "records", Ember.A([@objectWithName])
    it "uses the name attribute as display name", ->
      expect(@component.get("itemList.firstObject.name")).to.equal "Dennis Nedry"
      # Why isn't the DOM updating in the test?
      # expect(@component.$("dd:first-of-type")).to.have.text("foo")
    it "uses the object as the value", ->
      expect(@component.get("itemList.firstObject.value")).to.equal @objectWithName

  describe "When they have a value attribute", ->
    beforeEach -> Ember.run =>
      @objectWithValue = Ember.Object.create
        name: "Ian Malcolm", value: "Life, uh... finds a way."
      @component.set "records", Ember.A([@objectWithValue])
    it "passes the value attribute through", ->
      expect(@component.get("itemList.firstObject.name")).to.equal "Ian Malcolm"
      expect(@component.get("itemList.firstObject.value")).to.equal "Life, uh... finds a way."

  describe "selecting an item", ->
    beforeEach -> Ember.run =>
      @object1 = Ember.Object.create
        name: "Ian Malcolm", value: "Life, uh... finds a way."
      @object2 = Ember.Object.create
        name: "Richard Hammond", value: "I've made a huge mistake."
      @component.set "records", Ember.A([@object1, @object2])
    it "starts with no selected item", ->
      expect(@component.get("selectedItem")).to.be.falsy

    describe "with a selected item", ->
      beforeEach ->
        @item1 = @component.get("itemList.firstObject")
        Ember.run => @item1.set "selected", true
      it "reflects the selected item", ->
        expect(@component.get("selectedItem")).to.equal @item1

      describe "when selecting a different item", ->
        it "clears the previous selected item", ->
          @item2 = @component.get("itemList.lastObject")
          Ember.run => @component.send("select", @item2)
          expect(@item1.get("selected")).to.equal false
          expect(@component.get("selectedItem")).to.equal @item2

    describe "highlighting an item", ->
      it "has no highlighted item at the start", ->
        expect(@component.get("highlightedItem")).to.be.falsy
      describe "with a down arrow press", ->
        beforeEach -> Ember.run =>
          @component.highlightNextItem()
        it "highlights the first item in the list on down arrow press", ->
          expect(@component.get("highlightedItem.name")).to.equal "Ian Malcolm"
        describe "with a second down arrow press", ->
          beforeEach -> Ember.run =>
            @component.highlightNextItem()
          it "highlights the next item", ->
            expect(@component.get("highlightedItem.name")).to.equal "Richard Hammond"
          describe "with a third down arrow press", ->
            beforeEach -> Ember.run =>
              @component.highlightNextItem()
            it "wraps around to the first again", ->
              expect(@component.get("highlightedItem.name")).to.equal "Ian Malcolm"

      describe "with an up arrow press", ->
        beforeEach -> Ember.run =>
          @component.highlightPreviousItem()
        it "highlights the last item in the list on up arrow press", ->
          expect(@component.get("highlightedItem.name")).to.equal "Richard Hammond"
