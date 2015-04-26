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
      var store = choreDay.get("store");

      store.find("completed-chore", {chore: choreDay.get("chore"), completed_on: choreDay.get("date")})
           .then(function(completedChore) {
             completedChore.destroyRecord();
           });
    }
  },

  week: function() {
    var beginningOfWeek = moment(this.get("today")).startOf("week").subtract(1, "day");

    return [0, 1, 2, 3, 4, 5, 6].map(function(offset) {
      return moment(beginningOfWeek).add(offset, "days");
    });
  }.property("today"),

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
  }.property("today", "chore.completedChores.@each.completed_on"),
});
