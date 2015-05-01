import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
      cancel: function() {
        this.clear();
      },
      save: function() {
        this.store.createRecord("chore", {
          name: this.get("name"),
          rate: this.get("rate"),
          notes: this.get("notes"),
          repeating: this.get("repeating"),
        }).save().then(function() {
          this.clear.bind(this);
        }.bind(this));
      }
    },

    clear: function() {
      ["name", "rate", "notes"].forEach(function(property) {
        this.set(property, "");
      }.bind(this));
      this.set("repeating", false);
    },
});
