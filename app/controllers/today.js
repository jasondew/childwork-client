import Ember from 'ember';

export default Ember.Controller.extend({
  //TODO: cleanup duplicated functions
  thisWeek: function(date) {
    if (date === undefined) { return false; }

    var today = this.get("today"),
        endOfLastWeek = moment(today).startOf("week").subtract(2, "day"),
        endOfThisWeek = moment(today).endOf("week").subtract(1, "day");

    return date.isBetween(endOfLastWeek, endOfThisWeek, "day");
  },

  totalIncome: function() {
    return this.model.chores.reduce(function(sum, chore) {
      var completedChores = chore.get("completedChores"),
          rate = chore.get("rate"),
          countThisWeek = completedChores.filter(function(completedChore) {
            return this.thisWeek(completedChore.get("completed_on"));
          }.bind(this)).length;

      return sum + rate * countThisWeek;
    }.bind(this), 0);
  }.property("model.chores.@each.completedChores"),
});
