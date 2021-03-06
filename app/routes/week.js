import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      chores: this.store.find("chore"),
      payments: this.store.find("payment"),
    });
  },
});
