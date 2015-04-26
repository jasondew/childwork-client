import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",
  actions: {
    complete: function(dateString) {
      var chore = this.get("chore"),
          store = chore.get("store"),
          completedChore = store.createRecord("completed-chore", {
            chore_id: this.get("chore.id"),
            completed_on: moment(dateString).toDate()
          });

      completedChore.save();
    },
    uncomplete: function(dateString) {
      //TODO: implement
    }
  },

  choreDays: function() {
    var chore = this.get("chore"),
        today = this.get("today"),
        store = this.get("chore").store,
        completedDates = new Ember.Set(chore.get("completedChores").map(function(completedChore) {
          return completedChore.get("completed_on");
        }));

    console.log(completedDates);
    return [0, 1, 2, 3, 4, 5, 6].map(function(offset) {
      var date = moment(today).add(offset, "days"),
          complete = completedDates.contains(date);

      return store.createRecord("chore-day", {
        chore: chore,
        date: date,
        complete: complete
      });
    });
  }.property("chore", "today"),
});
