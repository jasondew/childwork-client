/* global moment:true */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",

  week: function() {
    var beginningOfWeek = moment(this.get("weekStarting")).startOf("week").subtract(1, "day");

    return [0, 1, 2, 3, 4, 5, 6].map(function(offset) {
      return moment(beginningOfWeek).add(offset, "days");
    });
  }.property("weekStarting"),

  choreDays: function() {
    var chore = this.get("chore");

    return this.get("week").map(function(date) {
      return chore.choreDay(date);
    });
  }.property("weekStarting", "chore.completedChores.@each.completed_on"),
});
