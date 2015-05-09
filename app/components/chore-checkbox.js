import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    complete: function(choreDay) {
      var store = choreDay.get("store"),
          completedChore = store.createRecord("completed-chore", {
            chore: choreDay.get("chore"),
            completed_on: choreDay.get("date")
          });

      completedChore.save();
    },
    uncomplete: function(choreDay) {
      var chore = choreDay.get("chore"),
          store = choreDay.get("store");

      store.find("completed-chore", {
        chore_id: chore.get("id"),
        completed_on: choreDay.get("date").format("YYYY-MM-DD")
      }).then(function(completedChores) {
        completedChores.forEach(function(completedChore) {
          completedChore.destroyRecord();
        });
      });
    }
  },
});
