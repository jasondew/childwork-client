/* global moment:true */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",
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
      }).then(function(completedChore) {
        completedChore.destroy();
        completedChore.save();
        chore.get("completedChores").removeObject(completedChore);
      });
    }
  },

  week: function() {
    var beginningOfWeek = moment(this.get("weekStarting")).startOf("week").subtract(1, "day");

    return [0, 1, 2, 3, 4, 5, 6].map(function(offset) {
      return moment(beginningOfWeek).add(offset, "days");
    });
  }.property("weekStarting"),

  choreDays: function() {
    var chore = this.get("chore"),
        store = this.get("chore").store,
        completedDates = chore.get("completedChores").filter(function(completedChore) {
          return completedChore.get("completed_on") !== null;
        }).map(function(completedChore) {
          return completedChore.get("completed_on").format("YYYY-MM-DD");
        });

    return this.get("week").map(function(date) {
      var formattedDate = date.format("YYYY-MM-DD"),
          complete = completedDates.indexOf(formattedDate) !== -1;

      return store.createRecord("chore-day", {
        chore: chore,
        date: date,
        complete: complete
      });
    });
  }.property("weekStarting", "chore.completedChores.@each.completed_on"),
});
