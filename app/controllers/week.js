/* global moment:true */
import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["todayString"],
  todayString: null,

  actions: {
    currentWeek: function() {
      this.changeToday(moment());
    },
    previousWeek: function() {
      this.changeToday(moment(this.get("today")).subtract(1, "weeks"));
    },
    nextWeek: function() {
      this.changeToday(moment(this.get("today")).add(1, "weeks"));
    },
  },

  changeToday: function(moment) {
    this.set("todayString", moment.format("YYYY-MM-DD"));
  },

  today: function() {
    var todayString = this.get("todayString");

    return todayString === null ? moment() : moment(todayString);
  }.property("todayString"),

  formattedToday: function() {
    return this.get("today").format("LL");
  }.property("today"),

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
  }.property("today", "model.chores.@each.completedChores"),
});
